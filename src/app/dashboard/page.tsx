'use client';

import { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Percent, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Database,
  Building,
  GraduationCap,
  Sparkles,
  Info
} from 'lucide-react';
import { db, AlumniResponse, isSupabaseConfigured } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { FAKULTAS_LIST, STATUS_ALUMNI_OPTIONS, HUBUNGAN_STUDI_PEKERJAAN_OPTIONS } from '@/lib/constants';

export default function DashboardPage() {
  const [responses, setResponses] = useState<AlumniResponse[]>([]);
  const [isFallback, setIsFallback] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFakultasFilter, setSelectedFakultasFilter] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('');
  const [sortField, setSortField] = useState<keyof AlumniResponse>('nama');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const result = await db.getAllResponses();
      if (result.success) {
        setResponses(result.data);
        setIsFallback(result.isFallback);
      }
    }
    loadData();
  }, []);

  // Format IDR Currency
  const formatIDR = (value?: number) => {
    if (!value) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // General Statistics Calculation
  const stats = useMemo(() => {
    const total = responses.length;
    if (total === 0) return { total: 0, workingPercent: 0, avgWaitTime: 0, avgIncome: 0 };

    const workingCount = responses.filter(r => 
      r.p1_status === 'Bekerja (full time/part time)' || r.p1_status === 'Wiraswasta'
    ).length;
    const workingPercent = Math.round((workingCount / total) * 100);

    // Calculate Average Wait Time
    // Map options to approximate months for averaging
    // "Kurang dari 0 bulan" -> 0, "Lebih dari 12 bulan" -> 13
    let waitSum = 0;
    let waitCount = 0;
    responses.forEach(r => {
      if (r.p3_waktu_tunggu) {
        let val = 0;
        if (r.p3_waktu_tunggu.includes('Kurang')) {
          val = 0;
        } else if (r.p3_waktu_tunggu.includes('Lebih')) {
          val = 13;
        } else {
          val = parseInt(r.p3_waktu_tunggu) || 0;
        }
        waitSum += val;
        waitCount++;
      }
    });
    const avgWaitTime = waitCount > 0 ? (waitSum / waitCount).toFixed(1) : '0';

    // Calculate Average Income
    let incomeSum = 0;
    let incomeCount = 0;
    responses.forEach(r => {
      if (r.p4_pendapatan) {
        incomeSum += Number(r.p4_pendapatan);
        incomeCount++;
      }
    });
    const avgIncome = incomeCount > 0 ? Math.round(incomeSum / incomeCount) : 0;

    return {
      total,
      workingPercent,
      avgWaitTime,
      avgIncome
    };
  }, [responses]);

  // Status Distribution Chart Data
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    STATUS_ALUMNI_OPTIONS.forEach(opt => counts[opt] = 0);
    
    responses.forEach(r => {
      if (counts[r.p1_status] !== undefined) {
        counts[r.p1_status]++;
      }
    });

    const colors = [
      '#6366f1', // Indigo
      '#10b981', // Emerald
      '#f59e0b', // Amber
      '#0ea5e9', // Sky
      '#ef4444'  // Red
    ];

    return STATUS_ALUMNI_OPTIONS.map((opt, i) => ({
      label: opt,
      count: counts[opt],
      percentage: stats.total > 0 ? Math.round((counts[opt] / stats.total) * 100) : 0,
      color: colors[i % colors.length]
    })).sort((a, b) => b.count - a.count);
  }, [responses, stats.total]);

  // Fakultas Distribution Data
  const fakultasData = useMemo(() => {
    const counts: Record<string, number> = {};
    FAKULTAS_LIST.forEach(f => counts[f.name] = 0);

    responses.forEach(r => {
      // Handle casing variations
      const found = FAKULTAS_LIST.find(f => f.name.toLowerCase() === r.fakultas.toLowerCase());
      if (found) {
        counts[found.name]++;
      }
    });

    const maxCount = Math.max(...Object.values(counts), 1);

    return FAKULTAS_LIST.map(f => ({
      name: f.name,
      count: counts[f.name],
      percentOfMax: Math.round((counts[f.name] / maxCount) * 100)
    })).sort((a, b) => b.count - a.count);
  }, [responses]);

  // Relevansi (Hubungan Bidang Studi dengan Pekerjaan)
  const relevansiData = useMemo(() => {
    const counts: Record<string, number> = {};
    HUBUNGAN_STUDI_PEKERJAAN_OPTIONS.forEach(opt => counts[opt] = 0);

    responses.forEach(r => {
      if (counts[r.p11_hubungan_studi_pekerjaan] !== undefined) {
        counts[r.p11_hubungan_studi_pekerjaan]++;
      }
    });

    const colors = [
      '#10b981', // Sangat Erat - Green
      '#34d399', // Erat - Light Green
      '#f59e0b', // Cukup Erat - Orange
      '#f87171', // Kurang Erat - Light Red
      '#ef4444'  // Tidak Sama Sekali - Red
    ];

    return HUBUNGAN_STUDI_PEKERJAAN_OPTIONS.map((opt, i) => ({
      label: opt,
      count: counts[opt],
      percentage: stats.total > 0 ? Math.round((counts[opt] / stats.total) * 100) : 0,
      color: colors[i]
    }));
  }, [responses, stats.total]);

  // Skill Competencies Gap (Comparison between 14a and 14b)
  const competencyGap = useMemo(() => {
    const competencies = [
      { id: 'etika', label: 'Etika' },
      { id: 'keahlian_ilmu', label: 'Keahlian Ilmu' },
      { id: 'bahasa_inggris', label: 'Bahasa Inggris' },
      { id: 'teknologi_informasi', label: 'IT/Teknologi' },
      { id: 'komunikasi', label: 'Komunikasi' },
      { id: 'kerja_sama_tim', label: 'Kerja Sama Tim' },
      { id: 'pengembangan', label: 'Pengembangan' }
    ];

    let counts = 0;
    const sumsA: Record<string, number> = {};
    const sumsB: Record<string, number> = {};
    
    competencies.forEach(c => {
      sumsA[c.id] = 0;
      sumsB[c.id] = 0;
    });

    responses.forEach(r => {
      let valid = true;
      // Check if this response has competency data
      competencies.forEach(c => {
        if ((r as any)[`p14a_${c.id}`] === undefined || (r as any)[`p14b_${c.id}`] === undefined) {
          valid = false;
        }
      });
      
      if (valid) {
        competencies.forEach(c => {
          sumsA[c.id] += Number((r as any)[`p14a_${c.id}`]);
          sumsB[c.id] += Number((r as any)[`p14b_${c.id}`]);
        });
        counts++;
      }
    });

    return competencies.map(c => {
      const avgA = counts > 0 ? (sumsA[c.id] / counts).toFixed(2) : '0';
      const avgB = counts > 0 ? (sumsB[c.id] / counts).toFixed(2) : '0';
      const gap = (Number(avgB) - Number(avgA)).toFixed(2);
      return {
        label: c.label,
        avgOwned: Number(avgA),
        avgRequired: Number(avgB),
        gap: Number(gap)
      };
    });
  }, [responses]);

  // Filter & Sort Responses Table
  const filteredAndSortedResponses = useMemo(() => {
    return responses
      .filter(r => {
        const matchesSearch = 
          r.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.prodi.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFakultas = !selectedFakultasFilter || r.fakultas === selectedFakultasFilter;
        const matchesStatus = !selectedStatusFilter || r.p1_status === selectedStatusFilter;

        return matchesSearch && matchesFakultas && matchesStatus;
      })
      .sort((a, b) => {
        let fieldA = (a as any)[sortField];
        let fieldB = (b as any)[sortField];

        if (typeof fieldA === 'string') fieldA = fieldA.toLowerCase();
        if (typeof fieldB === 'string') fieldB = fieldB.toLowerCase();

        if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [responses, searchTerm, selectedFakultasFilter, selectedStatusFilter, sortField, sortOrder]);

  const handleSort = (field: keyof AlumniResponse) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const exportRows = filteredAndSortedResponses.length > 0 ? filteredAndSortedResponses : responses;
    if (exportRows.length === 0) return;

    const headers = [
      'id',
      'created_at',
      'nim',
      'nama',
      'tahun_lulus',
      'fakultas',
      'prodi',
      'p1_status',
      'p2_sertifikasi',
      'p3_waktu_tunggu',
      'p4_pendapatan',
      'p5_lokasi_negara',
      'p5a_lokasi_provinsi',
      'p5b_lokasi_kabupaten',
      'p6_jenis_perusahaan',
      'p7_level_perusahaan',
      'p8a_nama_perusahaan',
      'p8b_alamat_perusahaan',
      'p9_posisi_wiraswasta',
      'p10a_sumber_biaya_studi',
      'p10b_perguruantinggi_studi',
      'p10c_prodi_studi',
      'p10d_tanggal_masuk_studi',
      'p11_hubungan_studi_pekerjaan',
      'p12_tingkat_pendidikan_sesuai',
      'p13_sumber_dana_kuliah',
      'p13a_sumber_dana_kuliah_lainnya',
      'p14a_etika',
      'p14a_keahlian_ilmu',
      'p14a_bahasa_inggris',
      'p14a_teknologi_informasi',
      'p14a_komunikasi',
      'p14a_kerja_sama_tim',
      'p14a_pengembangan',
      'p14b_etika',
      'p14b_keahlian_ilmu',
      'p14b_bahasa_inggris',
      'p14b_teknologi_informasi',
      'p14b_komunikasi',
      'p14b_kerja_sama_tim',
      'p14b_pengembangan',
      'p15_perkuliahan',
      'p15_demonstrasi',
      'p15_proyek_riset',
      'p15_magang',
      'p15_praktikum',
      'p15_kerja_lapangan',
      'p16_mulai_cari_kerja',
      'p17_cara_cari_kerja',
      'p17m_cara_cari_kerja_lainnya',
      'p18_jumlah_lamaran',
      'p19_jumlah_respon',
      'p20_jumlah_wawancara',
      'p21_kesesuaian_bidang',
      'p22_alasan_tidak_sesuai',
      'p22a_alasan_tidak_sesuai_lainnya'
    ];

    const rows = exportRows.map(r => [
      r.id ?? '',
      r.created_at ?? '',
      r.nim,
      r.nama,
      r.tahun_lulus,
      r.fakultas,
      r.prodi,
      r.p1_status,
      r.p2_sertifikasi ?? '',
      r.p3_waktu_tunggu ?? '',
      r.p4_pendapatan ?? '',
      r.p5_lokasi_negara ?? '',
      r.p5a_lokasi_provinsi ?? '',
      r.p5b_lokasi_kabupaten ?? '',
      r.p6_jenis_perusahaan ?? '',
      r.p7_level_perusahaan ?? '',
      r.p8a_nama_perusahaan ?? '',
      r.p8b_alamat_perusahaan ?? '',
      r.p9_posisi_wiraswasta ?? '',
      r.p10a_sumber_biaya_studi ?? '',
      r.p10b_perguruantinggi_studi ?? '',
      r.p10c_prodi_studi ?? '',
      r.p10d_tanggal_masuk_studi ?? '',
      r.p11_hubungan_studi_pekerjaan,
      r.p12_tingkat_pendidikan_sesuai,
      r.p13_sumber_dana_kuliah ?? '',
      r.p13a_sumber_dana_kuliah_lainnya ?? '',
      r.p14a_etika ?? '',
      r.p14a_keahlian_ilmu ?? '',
      r.p14a_bahasa_inggris ?? '',
      r.p14a_teknologi_informasi ?? '',
      r.p14a_komunikasi ?? '',
      r.p14a_kerja_sama_tim ?? '',
      r.p14a_pengembangan ?? '',
      r.p14b_etika ?? '',
      r.p14b_keahlian_ilmu ?? '',
      r.p14b_bahasa_inggris ?? '',
      r.p14b_teknologi_informasi ?? '',
      r.p14b_komunikasi ?? '',
      r.p14b_kerja_sama_tim ?? '',
      r.p14b_pengembangan ?? '',
      r.p15_perkuliahan ?? '',
      r.p15_demonstrasi ?? '',
      r.p15_proyek_riset ?? '',
      r.p15_magang ?? '',
      r.p15_praktikum ?? '',
      r.p15_kerja_lapangan ?? '',
      r.p16_mulai_cari_kerja ?? '',
      Array.isArray(r.p17_cara_cari_kerja) ? r.p17_cara_cari_kerja.join('; ') : r.p17_cara_cari_kerja ?? '',
      r.p17m_cara_cari_kerja_lainnya ?? '',
      r.p18_jumlah_lamaran ?? '',
      r.p19_jumlah_respon ?? '',
      r.p20_jumlah_wawancara ?? '',
      r.p21_kesesuaian_bidang ?? '',
      r.p22_alasan_tidak_sesuai ?? '',
      r.p22a_alasan_tidak_sesuai_lainnya ?? ''
    ]);

    const csvBody = [headers.join(','), ...rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csvBody], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Tracer_Study_UNIPAS_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(`NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL\nNEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      {isFallback && (
        <Card className="border-slate-200/80 bg-gradient-to-r from-slate-100 via-sky-50 to-slate-100 shadow-sm shadow-slate-300/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-200 text-slate-900 shadow-sm">
                <Database size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Mode Demonstrasi</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Data lokal aktif, belum terhubung Supabase</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                  Aplikasi saat ini berjalan dalam mode demo. Untuk menyimpan data secara real-time, hubungkan Supabase dan atur variabel lingkungan di <span className="font-semibold text-slate-900">.env.local</span>.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                1. Buat tabel <span className="font-semibold text-slate-900">schema.sql</span>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                2. Tambahkan <span className="font-semibold text-slate-900">.env.local</span>
              </div>
              <Button onClick={handleCopyEnv} variant="secondary" className="h-11 rounded-full px-4 py-2 text-sm">
                {isCopied ? 'Tersalin!' : 'Salin Variabel .env'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Dashboard</p>
            <h1 className="text-3xl font-semibold text-slate-900">Analytics Alumni UNIPAS</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              Ringkasan hasil Tracer Study, keterserapan kerja, relevansi kompetensi, dan data responden alumni.
            </p>
          </div>
          {/* <Button onClick={handleExportCSV} className="inline-flex items-center gap-2">
            <Download size={18} />
            Ekspor CSV
          </Button> */}
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-100 text-indigo-700">
              <Users size={24} />
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Total responden
            </span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-900">{stats.total}</p>
          <p className="mt-2 text-sm text-slate-500">Jumlah alumni yang sudah mengisi survei.</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-100 text-sky-700">
              <Percent size={24} />
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Keterserapan kerja
            </span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-900">{stats.workingPercent}%</p>
          <p className="mt-2 text-sm text-slate-500">Alumni bekerja penuh/part-time atau wiraswasta.</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-amber-100 text-amber-700">
              <Clock size={24} />
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Waktu tunggu
            </span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-900">{stats.avgWaitTime}</p>
          <p className="mt-2 text-sm text-slate-500">Rata-rata bulan alumni mendapat pekerjaan.</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700">
              <DollarSign size={24} />
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Rata-rata pendapatan
            </span>
          </div>
          <p className="mt-6 text-4xl font-semibold text-slate-900">{formatIDR(stats.avgIncome)}</p>
          <p className="mt-2 text-sm text-slate-500">Penghasilan bulanan rata-rata saat masuk kerja.</p>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Status Alumni</h2>
              <p className="mt-1 text-sm text-slate-500">Distribusi status pekerjaan alumni.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {statusData.map(item => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{item.label}</span>
                  <span className="text-slate-900">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Responden per Fakultas</h2>
              <p className="mt-1 text-sm text-slate-500">Perbandingan jumlah alumni berdasarkan fakultas.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {fakultasData.map(item => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span className="truncate pr-4" title={item.name}>{item.name}</span>
                  <span className="text-slate-900">{item.count}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-indigo-500" style={{ width: `${item.percentOfMax}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Relevansi Studi ke Kerja</h2>
              <p className="mt-1 text-sm text-slate-500">Hubungan kesesuaian kompetensi dengan dunia kerja.</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {relevansiData.map(item => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{item.label}</span>
                  <span className="text-slate-900">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Kesenjangan Kompetensi</h2>
              <p className="mt-1 text-sm text-slate-500">Perbandingan kemampuan alumni saat lulus dan yang dibutuhkan saat ini.</p>
            </div>
          </div>
          <div className="mt-6 space-y-5">
            {competencyGap.map(item => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{item.label}</span>
                  <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${item.gap > 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {item.gap > 0 ? `+${item.gap} Gap` : `${item.gap} Match`}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-500">
                  <div>Dikuasai: <span className="font-semibold text-slate-900">{item.avgOwned}</span></div>
                  <div>Diperlukan: <span className="font-semibold text-slate-900">{item.avgRequired}</span></div>
                </div>
                <div className="relative h-4 overflow-hidden rounded-full bg-slate-100">
                  <div className="absolute left-0 top-0 h-full rounded-full bg-emerald-500 opacity-70" style={{ width: `${(item.avgOwned / 5) * 100}%` }} />
                  <div className="absolute left-0 top-0 h-full rounded-full bg-indigo-500/50" style={{ width: `${(item.avgRequired / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Daftar Responden Alumni</h2>
            <p className="mt-1 text-sm text-slate-500">Filter dan lihat detail responden dengan cepat.</p>
          </div>
          <Button onClick={handleExportCSV} variant="secondary" className="h-11 rounded-full px-4 py-2 text-sm inline-flex items-center gap-2">
            <Download size={18} />
            Ekspor CSV
          </Button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(280px,1fr)_minmax(180px,220px)]">
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Cari NIM, Nama, Prodi..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-12"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"><Filter size={16} /></span>
              <Select
                value={selectedFakultasFilter}
                onChange={e => setSelectedFakultasFilter(e.target.value)}
                className="pl-12"
              >
                <option value="">Semua Fakultas</option>
                {FAKULTAS_LIST.map(f => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </Select>
            </div>
            <Select
              value={selectedStatusFilter}
              onChange={e => setSelectedStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              {STATUS_ALUMNI_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-600">NIM</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Nama</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Lulus</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Fakultas</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Program Studi</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 font-semibold text-slate-600">Relevansi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAndSortedResponses.length > 0 ? (
                filteredAndSortedResponses.map(row => (
                  <tr key={row.nim} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium text-slate-900">{row.nim}</td>
                    <td className="px-4 py-4 text-slate-700">{row.nama}</td>
                    <td className="px-4 py-4 text-slate-700">{row.tahun_lulus}</td>
                    <td className="px-4 py-4 text-slate-600">{row.fakultas}</td>
                    <td className="px-4 py-4 text-slate-700">{row.prodi}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        row.p1_status.startsWith('Bekerja') ? 'bg-indigo-100 text-indigo-700' :
                        row.p1_status.startsWith('Wiraswasta') ? 'bg-amber-100 text-amber-700' :
                        row.p1_status.startsWith('Melanjutkan') ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {row.p1_status || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        row.p11_hubungan_studi_pekerjaan === 'Sangat Erat' || row.p11_hubungan_studi_pekerjaan === 'Erat' ? 'bg-emerald-100 text-emerald-700' :
                        row.p11_hubungan_studi_pekerjaan === 'Cukup Erat' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {row.p11_hubungan_studi_pekerjaan || '-'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                    Tidak ada data responden yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
