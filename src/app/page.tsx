'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Star, 
  MapPin, 
  HelpCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building,
  DollarSign,
  Clock,
  Sparkles
} from 'lucide-react';
import { db, AlumniResponse } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  FAKULTAS_LIST, 
  TAHUN_LULUS_OPTIONS, 
  STATUS_ALUMNI_OPTIONS, 
  SERTIFIKASI_OPTIONS, 
  WAKTU_TUNGGU_OPTIONS, 
  JENIS_PERUSAHAAN_OPTIONS, 
  LEVEL_PERUSAHAAN_OPTIONS, 
  POSISI_WIRASWASTA_OPTIONS, 
  BIAYA_STUDI_LANJUT_OPTIONS, 
  HUBUNGAN_STUDI_PEKERJAAN_OPTIONS, 
  TINGKAT_PENDIDIKAN_SESUAI_OPTIONS, 
  SUMBER_DANA_KULIAH_OPTIONS, 
  METODE_PEMBELAJARAN_LIST, 
  METODE_PEMBELAJARAN_OPTIONS, 
  KOMPETENSI_LIST, 
  CARI_KERJA_OPTIONS, 
  CARA_CARI_KERJA_OPTIONS, 
  ALASAN_TIDAK_SESUAI_OPTIONS,
  PROVINSI_INDONESIA
} from '@/lib/constants';

export default function FormPage() {
  const initialFormData: Partial<AlumniResponse> = {
    nim: '',
    nama: '',
    tahun_lulus: 2024,
    fakultas: '',
    prodi: '',
    p1_status: '',
    p2_sertifikasi: 0,
    p3_waktu_tunggu: '',
    p4_pendapatan: undefined,
    p5_lokasi_negara: 'Indonesia',
    p5a_lokasi_provinsi: '',
    p5b_lokasi_kabupaten: '',
    p6_jenis_perusahaan: '',
    p7_level_perusahaan: '',
    p8a_nama_perusahaan: '',
    p8b_alamat_perusahaan: '',
    p9_posisi_wiraswasta: '',
    p10a_sumber_biaya_studi: '',
    p10b_perguruantinggi_studi: '',
    p10c_prodi_studi: '',
    p11_hubungan_studi_pekerjaan: '',
    p12_tingkat_pendidikan_sesuai: '',
    p13_sumber_dana_kuliah: '',
    p13a_sumber_dana_kuliah_lainnya: '',
    // 14a
    p14a_etika: undefined,
    p14a_keahlian_ilmu: undefined,
    p14a_bahasa_inggris: undefined,
    p14a_teknologi_informasi: undefined,
    p14a_komunikasi: undefined,
    p14a_kerja_sama_tim: undefined,
    p14a_pengembangan: undefined,
    // 14b
    p14b_etika: undefined,
    p14b_keahlian_ilmu: undefined,
    p14b_bahasa_inggris: undefined,
    p14b_teknologi_informasi: undefined,
    p14b_komunikasi: undefined,
    p14b_kerja_sama_tim: undefined,
    p14b_pengembangan: undefined,
    // 15
    p15_perkuliahan: '',
    p15_demonstrasi: '',
    p15_proyek_riset: '',
    p15_magang: '',
    p15_praktikum: '',
    p15_kerja_lapangan: '',
    // 16 & 17
    p16_mulai_cari_kerja: '',
    p17_cara_cari_kerja: [],
    p17m_cara_cari_kerja_lainnya: '',
    p18_jumlah_lamaran: undefined,
    p19_jumlah_respon: undefined,
    p20_jumlah_wawancara: undefined,
    p21_kesesuaian_bidang: '',
    p22_alasan_tidak_sesuai: '',
    p22a_alasan_tidak_sesuai_lainnya: ''
  };

  // Basic Form State
  const [formData, setFormData] = useState<Partial<AlumniResponse>>(initialFormData);

  // State for sub-options
  const [selectedFakultas, setSelectedFakultas] = useState<string>('');
  const [prodiOptions, setProdiOptions] = useState<Array<{id: string, name: string}>>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Update prodi options when fakultas changes
  useEffect(() => {
    if (selectedFakultas) {
      const found = FAKULTAS_LIST.find(f => f.name === selectedFakultas);
      if (found) {
        setProdiOptions(found.prodi);
        setFormData(prev => ({ ...prev, fakultas: selectedFakultas, prodi: '' }));
      }
    } else {
      setProdiOptions([]);
      setFormData(prev => ({ ...prev, fakultas: '', prodi: '' }));
    }
  }, [selectedFakultas]);

  // Calculate completion progress
  useEffect(() => {
    const requiredFields = [
      'nim', 'nama', 'tahun_lulus', 'fakultas', 'prodi', 'p1_status',
      'p11_hubungan_studi_pekerjaan', 'p12_tingkat_pendidikan_sesuai',
      'p14a_etika', 'p14a_keahlian_ilmu', 'p14a_bahasa_inggris', 'p14a_teknologi_informasi', 'p14a_komunikasi', 'p14a_kerja_sama_tim', 'p14a_pengembangan',
      'p14b_etika', 'p14b_keahlian_ilmu', 'p14b_bahasa_inggris', 'p14b_teknologi_informasi', 'p14b_komunikasi', 'p14b_kerja_sama_tim', 'p14b_pengembangan'
    ];
    
    let filled = 0;
    requiredFields.forEach(field => {
      const val = (formData as any)[field];
      if (val !== undefined && val !== null && val !== '') {
        filled++;
      }
    });
    
    const percentage = Math.round((filled / requiredFields.length) * 100);
    setProgress(percentage);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Parse numeric fields
    if (name === 'p2_sertifikasi' || name === 'p4_pendapatan' || name === 'p18_jumlah_lamaran' || name === 'p19_jumlah_respon' || name === 'p20_jumlah_wawancara') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value === '' ? undefined : Number(value) 
      }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScoreChange = (competencyKey: string, score: number, isRequiredNow: boolean) => {
    const fieldName = isRequiredNow ? `p14b_${competencyKey}` : `p14a_${competencyKey}`;
    setFormData(prev => ({ ...prev, [fieldName]: score }));
  };

  const handleCheckboxChange = (option: string) => {
    const current = formData.p17_cara_cari_kerja || [];
    if (current.includes(option)) {
      setFormData(prev => ({
        ...prev,
        p17_cara_cari_kerja: current.filter(item => item !== option)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        p17_cara_cari_kerja: [...current, option]
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!formData.nim) {
      setErrorMessage('NIM wajib diisi.');
      return false;
    }
    if (!formData.nama) {
      setErrorMessage('Nama Lengkap wajib diisi.');
      return false;
    }
    if (!formData.fakultas) {
      setErrorMessage('Silakan pilih Fakultas Anda.');
      return false;
    }
    if (!formData.prodi) {
      setErrorMessage('Silakan pilih Program Studi Anda.');
      return false;
    }
    if (!formData.p1_status) {
      setErrorMessage('Silakan pilih status pekerjaan Anda saat ini.');
      return false;
    }
    if (!formData.p11_hubungan_studi_pekerjaan) {
      setErrorMessage('Pertanyaan 11 (Keeratan hubungan studi) wajib diisi.');
      return false;
    }
    if (!formData.p12_tingkat_pendidikan_sesuai) {
      setErrorMessage('Pertanyaan 12 (Kesesuaian tingkat pendidikan) wajib diisi.');
      return false;
    }

    // Verify Likert fields
    const keys = ['etika', 'keahlian_ilmu', 'bahasa_inggris', 'teknologi_informasi', 'komunikasi', 'kerja_sama_tim', 'pengembangan'];
    for (const key of keys) {
      if ((formData as any)[`p14a_${key}`] === undefined) {
        setErrorMessage(`Harap lengkapi semua penilaian kompetensi Anda saat lulus (Bagian 14a - ${key.replace('_', ' ')}).`);
        return false;
      }
      if ((formData as any)[`p14b_${key}`] === undefined) {
        setErrorMessage(`Harap lengkapi semua penilaian kompetensi yang diperlukan saat ini (Bagian 14b - ${key.replace('_', ' ')}).`);
        return false;
      }
    }

    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    const result = await db.submitResponse({
      ...formData,
      p10d_tanggal_masuk_studi: new Date().toISOString().split('T')[0]
    } as AlumniResponse);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage('Data Anda berhasil tersimpan. Terima kasih atas partisipasinya!');
      setErrorMessage('');
      setFormData(initialFormData);
      setSelectedFakultas('');
      setProdiOptions([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setErrorMessage(result.error || 'Terjadi kesalahan saat menyimpan data.');
      setSuccessMessage('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Check state groups
  const showWorkingFields = formData.p1_status === 'Bekerja (full time/part time)' || formData.p1_status === 'Wiraswasta';
  const showEntrepreneurFields = formData.p1_status === 'Wiraswasta';
  const showStudyFields = formData.p1_status === 'Melanjutkan pendidikan';
  const showNotMatchingReason = formData.p21_kesesuaian_bidang === 'Tidak';

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
      <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-slate-100 to-white p-8 shadow-sm shadow-slate-300/10">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/5 px-4 py-2 text-sm font-semibold text-slate-900">
            <User size={18} /> Tracer Study Alumni
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Formulir Tracer Study Alumni</h1>
            <p className="text-base leading-8 text-slate-600">
              Mohon kesediaan Anda untuk mengisi kuesioner ini. Data yang Anda berikan sangat penting untuk evaluasi kurikulum, pelaporan IKU/IKT, dan akreditasi Universitas Pasifik Morotai.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Progress</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{progress}%</p>
              <p className="mt-1 text-sm text-slate-500">Formulir yang sudah Anda isi.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Tujuan</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">Data Alumni Terpercaya</p>
              <p className="mt-1 text-sm text-slate-500">Form akan direset otomatis setelah berhasil dikirim.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-24 z-20 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm shadow-slate-300/10 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Progress Pengisian</p>
            <p className="mt-1 text-sm text-slate-600">Isi semua bagian untuk hasil terbaik.</p>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{progress}% selesai</div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {successMessage && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-900 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} />
            <p className="text-sm font-semibold">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50/80 p-4 text-rose-900 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="text-sm font-semibold">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bagian 1</p>
              <h2 className="text-2xl font-semibold text-slate-900">Identitas Pengisi</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <GraduationCap size={18} /> UNIPAS
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="nim">P1 - NIM <span className="text-rose-500">*</span></Label>
              <Input
                id="nim"
                name="nim"
                placeholder="Masukkan Nomor Induk Mahasiswa"
                value={formData.nim || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="nama">P2 - Nama Lengkap <span className="text-rose-500">*</span></Label>
              <Input
                id="nama"
                name="nama"
                placeholder="Masukkan Nama Lengkap"
                value={formData.nama || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <Label htmlFor="tahun_lulus">P3 - Tahun Lulus <span className="text-rose-500">*</span></Label>
              <Select id="tahun_lulus" name="tahun_lulus" value={formData.tahun_lulus || ''} onChange={handleChange} required>
                {TAHUN_LULUS_OPTIONS.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="fakultas">Fakultas <span className="text-rose-500">*</span></Label>
              <Select id="fakultas" value={selectedFakultas} onChange={e => setSelectedFakultas(e.target.value)} required>
                <option value="">-- Pilih Fakultas --</option>
                {FAKULTAS_LIST.map(f => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="prodi">Program Studi <span className="text-rose-500">*</span></Label>
              <Select id="prodi" name="prodi" value={formData.prodi || ''} onChange={handleChange} disabled={!selectedFakultas} required>
                <option value="">-- Pilih Prodi --</option>
                {prodiOptions.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bagian 2</p>
              <h2 className="text-2xl font-semibold text-slate-900">Status & Capaian Pekerjaan</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <Briefcase size={18} /> Info Karir
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>P1 - Jelaskan status Anda saat ini? <span className="text-rose-500">*</span></Label>
              <div className="grid gap-3 md:grid-cols-2">
                {STATUS_ALUMNI_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, p1_status: opt }))}
                    className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p1_status === opt ? 'border-indigo-400 bg-indigo-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="p2_sertifikasi">P2 - Berapa jumlah sertifikasi kompetensi yang Anda miliki?</Label>
                <Select id="p2_sertifikasi" name="p2_sertifikasi" value={formData.p2_sertifikasi ?? 0} onChange={handleChange}>
                  {SERTIFIKASI_OPTIONS.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </Select>
              </div>
            </div>

            {showWorkingFields && (
              <div className="space-y-6 border-t border-slate-200 pt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="p3_waktu_tunggu">P3 - Berapa bulan sampai pekerjaan pertama?</Label>
                    <Select id="p3_waktu_tunggu" name="p3_waktu_tunggu" value={formData.p3_waktu_tunggu || ''} onChange={handleChange}>
                      <option value="">-- Pilih Waktu Tunggu --</option>
                      {WAKTU_TUNGGU_OPTIONS.map(wt => (
                        <option key={wt} value={wt}>{wt}{wt !== 'Kurang dari 0 bulan (sebelum lulus)' && wt !== 'Lebih dari 12 bulan' ? ' bulan' : ''}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="p4_pendapatan">P4 - Pendapatan pertama (take home pay)</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">Rp</span>
                      <Input
                        id="p4_pendapatan"
                        name="p4_pendapatan"
                        type="number"
                        className="pl-14"
                        placeholder="Contoh: 4500000"
                        value={formData.p4_pendapatan || ''}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-3">
                    <Label htmlFor="p5_lokasi_negara">P5 - Negara Lokasi Bekerja</Label>
                    <Input id="p5_lokasi_negara" name="p5_lokasi_negara" value={formData.p5_lokasi_negara || ''} onChange={handleChange} />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="p5a_lokasi_provinsi">5a - Provinsi Lokasi Bekerja</Label>
                    <Select id="p5a_lokasi_provinsi" name="p5a_lokasi_provinsi" value={formData.p5a_lokasi_provinsi || ''} onChange={handleChange}>
                      <option value="">-- Pilih Provinsi --</option>
                      {PROVINSI_INDONESIA.map(prov => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="p5b_lokasi_kabupaten">5b - Kabupaten/Kota Lokasi Bekerja</Label>
                    <Input
                      id="p5b_lokasi_kabupaten"
                      name="p5b_lokasi_kabupaten"
                      placeholder="Contoh: Pulau Morotai"
                      value={formData.p5b_lokasi_kabupaten || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="p6_jenis_perusahaan">P6 - Jenis perusahaan tempat bekerja</Label>
                    <Select id="p6_jenis_perusahaan" name="p6_jenis_perusahaan" value={formData.p6_jenis_perusahaan || ''} onChange={handleChange}>
                      <option value="">-- Pilih Jenis --</option>
                      {JENIS_PERUSAHAAN_OPTIONS.map(jp => (
                        <option key={jp} value={jp}>{jp}</option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="p7_level_perusahaan">P7 - Tingkat perusahaan tempat kerja</Label>
                    <Select id="p7_level_perusahaan" name="p7_level_perusahaan" value={formData.p7_level_perusahaan || ''} onChange={handleChange}>
                      <option value="">-- Pilih Level --</option>
                      {LEVEL_PERUSAHAAN_OPTIONS.map(lp => (
                        <option key={lp} value={lp}>{lp}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="p8a_nama_perusahaan">P8a - Nama perusahaan/kantor</Label>
                  <Input
                    id="p8a_nama_perusahaan"
                    name="p8a_nama_perusahaan"
                    placeholder="Contoh: PT Semesta Raya"
                    value={formData.p8a_nama_perusahaan || ''}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="p8b_alamat_perusahaan">P8b - Alamat tempat bekerja</Label>
                  <Textarea
                    id="p8b_alamat_perusahaan"
                    name="p8b_alamat_perusahaan"
                    rows={3}
                    placeholder="Masukkan alamat lengkap kantor/perusahaan"
                    value={formData.p8b_alamat_perusahaan || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {showEntrepreneurFields && (
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-slate-700" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Detail Kewirausahaan</h3>
                    <p className="text-sm text-slate-500">Pilih posisi/jabatan bila Anda wiraswasta.</p>
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {POSISI_WIRASWASTA_OPTIONS.map(pos => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, p9_posisi_wiraswasta: pos }))}
                      className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p9_posisi_wiraswasta === pos ? 'border-emerald-400 bg-emerald-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showStudyFields && (
              <div className="border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-slate-700" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Detail Studi Lanjut</h3>
                    <p className="text-sm text-slate-500">Isi data studi lanjut bila melanjutkan.</p>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {BIAYA_STUDI_LANJUT_OPTIONS.map(cost => (
                    <button
                      key={cost}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, p10a_sumber_biaya_studi: cost }))}
                      className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p10a_sumber_biaya_studi === cost ? 'border-indigo-400 bg-indigo-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {cost}
                    </button>
                  ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="p10b_perguruantinggi_studi">10b - Nama Perguruan Tinggi</Label>
                    <Input
                      id="p10b_perguruantinggi_studi"
                      name="p10b_perguruantinggi_studi"
                      placeholder="Contoh: Universitas Indonesia"
                      value={formData.p10b_perguruantinggi_studi || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="p10c_prodi_studi">10c - Nama Program Studi</Label>
                    <Input
                      id="p10c_prodi_studi"
                      name="p10c_prodi_studi"
                      placeholder="Contoh: Magister Teknik Informatika"
                      value={formData.p10c_prodi_studi || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bagian 3</p>
              <h2 className="text-2xl font-semibold text-slate-900">Relevansi & Pembiayaan</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <Star size={18} /> Dana Kuliah
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label>P11 - Seberapa erat hubungan kompetensi bidang studi dengan pekerjaan Anda? <span className="text-rose-500">*</span></Label>
              <div className="grid gap-3 md:grid-cols-2">
                {HUBUNGAN_STUDI_PEKERJAAN_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, p11_hubungan_studi_pekerjaan: opt }))}
                    className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p11_hubungan_studi_pekerjaan === opt ? 'border-emerald-400 bg-emerald-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>P12 - Tingkat pendidikan yang paling tepat/sesuai untuk pekerjaan Anda saat ini? <span className="text-rose-500">*</span></Label>
              <div className="grid gap-3 md:grid-cols-2">
                {TINGKAT_PENDIDIKAN_SESUAI_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, p12_tingkat_pendidikan_sesuai: opt }))}
                    className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p12_tingkat_pendidikan_sesuai === opt ? 'border-indigo-400 bg-indigo-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>P13 - Sebutkan sumber dana dalam pembiayaan kuliah saat kuliah di UNIPAS?</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {SUMBER_DANA_KULIAH_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, p13_sumber_dana_kuliah: opt }))}
                    className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p13_sumber_dana_kuliah === opt ? 'border-indigo-400 bg-indigo-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {formData.p13_sumber_dana_kuliah === 'Lainnya' && (
              <div className="space-y-3">
                <Label htmlFor="p13a_sumber_dana_kuliah_lainnya">13a - Tuliskan sumber dana lainnya:</Label>
                <Input
                  id="p13a_sumber_dana_kuliah_lainnya"
                  name="p13a_sumber_dana_kuliah_lainnya"
                  placeholder="Masukkan sumber dana lainnya"
                  value={formData.p13a_sumber_dana_kuliah_lainnya || ''}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bagian 4</p>
              <h2 className="text-2xl font-semibold text-slate-900">Penilaian Kompetensi</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <Sparkles size={18} /> Kompetensi
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">14a - Pada saat lulus, pada tingkat mana kompetensi di bawah ini anda kuasai? <span className="text-rose-500">*</span></h3>
                <p className="text-sm text-slate-500">Skor 1-5 (1 sangat rendah - 5 sangat tinggi)</p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Kompetensi</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Skor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {KOMPETENSI_LIST.map(comp => {
                      const currentVal = (formData as any)[`p14a_${comp.id}`];
                      return (
                        <tr key={comp.id}>
                          <td className="px-4 py-4 text-slate-700">{comp.label}</td>
                          <td className="px-4 py-4">
                            <div className="grid grid-cols-5 gap-2">
                              {[1,2,3,4,5].map(score => (
                                <button
                                  key={score}
                                  type="button"
                                  onClick={() => handleScoreChange(comp.id, score, false)}
                                  className={`rounded-full border py-2 text-sm font-medium transition ${currentVal === score ? 'border-indigo-500 bg-indigo-50 text-slate-900' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                                >
                                  {score}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900">14b - Pada saat ini, pada tingkat mana kompetensi di bawah ini diperlukan dalam pekerjaan? <span className="text-rose-500">*</span></h3>
                <p className="text-sm text-slate-500">Skor 1-5 (1 sangat rendah - 5 sangat tinggi)</p>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Kompetensi</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Skor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {KOMPETENSI_LIST.map(comp => {
                      const currentVal = (formData as any)[`p14b_${comp.id}`];
                      return (
                        <tr key={comp.id}>
                          <td className="px-4 py-4 text-slate-700">{comp.label}</td>
                          <td className="px-4 py-4">
                            <div className="grid grid-cols-5 gap-2">
                              {[1,2,3,4,5].map(score => (
                                <button
                                  key={score}
                                  type="button"
                                  onClick={() => handleScoreChange(comp.id, score, true)}
                                  className={`rounded-full border py-2 text-sm font-medium transition ${currentVal === score ? 'border-indigo-500 bg-indigo-50 text-slate-900' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                                >
                                  {score}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bagian 5</p>
              <h2 className="text-2xl font-semibold text-slate-900">Evaluasi Metode Pembelajaran</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <BookOpen size={18} /> Metode
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Metode Pembelajaran</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Tingkat Penekanan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {METODE_PEMBELAJARAN_LIST.map(method => (
                  <tr key={method.id}>
                    <td className="px-4 py-4 text-slate-700">{method.label}</td>
                    <td className="px-4 py-4">
                      <Select
                        name={method.id}
                        value={(formData as any)[method.id] || ''}
                        onChange={handleChange}
                        className="max-w-[220px]"
                      >
                        <option value="">-- Pilih --</option>
                        {METODE_PEMBELAJARAN_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bagian 6</p>
              <h2 className="text-2xl font-semibold text-slate-900">Pencarian Pekerjaan Pertama</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <Clock size={18} /> Mencari Kerja
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="p16_mulai_cari_kerja">P16 - Kapan Anda mulai mencari pekerjaan pertama setelah lulus?</Label>
              <Select id="p16_mulai_cari_kerja" name="p16_mulai_cari_kerja" value={formData.p16_mulai_cari_kerja || ''} onChange={handleChange}>
                <option value="">-- Pilih --</option>
                {CARI_KERJA_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-3">
              <Label>P17 - Bagaimana Anda mencari pekerjaan tersebut? (Bisa lebih dari satu)</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {CARA_CARI_KERJA_OPTIONS.map(opt => {
                  const isChecked = (formData.p17_cara_cari_kerja || []).includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleCheckboxChange(opt)}
                      className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${isChecked ? 'border-indigo-400 bg-indigo-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {(formData.p17_cara_cari_kerja || []).includes('Lainnya') && (
            <div className="space-y-3">
              <Label htmlFor="p17m_cara_cari_kerja_lainnya">17m - Tuliskan cara lainnya:</Label>
              <Input
                id="p17m_cara_cari_kerja_lainnya"
                name="p17m_cara_cari_kerja_lainnya"
                placeholder="Masukkan metode lainnya"
                value={formData.p17m_cara_cari_kerja_lainnya || ''}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3">
              <Label htmlFor="p18_jumlah_lamaran">P18 - Jumlah lamaran sebelum mendapat pekerjaan</Label>
              <Input
                id="p18_jumlah_lamaran"
                name="p18_jumlah_lamaran"
                type="number"
                min={0}
                placeholder="0"
                value={formData.p18_jumlah_lamaran ?? ''}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="p19_jumlah_respon">P19 - Jumlah respon lamaran</Label>
              <Input
                id="p19_jumlah_respon"
                name="p19_jumlah_respon"
                type="number"
                min={0}
                placeholder="0"
                value={formData.p19_jumlah_respon ?? ''}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="p20_jumlah_wawancara">P20 - Jumlah undangan wawancara</Label>
              <Input
                id="p20_jumlah_wawancara"
                name="p20_jumlah_wawancara"
                type="number"
                min={0}
                placeholder="0"
                value={formData.p20_jumlah_wawancara ?? ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Bagian 7</p>
              <h2 className="text-2xl font-semibold text-slate-900">Kesesuaian Bidang Ilmu</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600">
              <HelpCircle size={18} /> Kesesuaian
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {['Ya', 'Tidak (jika tidak lanjut pada pertanyaan nomor 22)'].map(opt => {
              const value = opt.startsWith('Ya') ? 'Ya' : 'Tidak';
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, p21_kesesuaian_bidang: value }))}
                  className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p21_kesesuaian_bidang === value ? 'border-indigo-400 bg-indigo-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showNotMatchingReason && (
            <div className="border-t border-slate-200 pt-6">
              <div className="space-y-3">
                <Label>22 - Apa alasan Anda tetap bekerja di industri/usaha yang tidak sesuai dengan bidang ilmu Anda?</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  {ALASAN_TIDAK_SESUAI_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, p22_alasan_tidak_sesuai: opt }))}
                      className={`rounded-3xl border px-4 py-4 text-left text-sm font-medium transition ${formData.p22_alasan_tidak_sesuai === opt ? 'border-rose-400 bg-rose-50 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {formData.p22_alasan_tidak_sesuai === 'Lainnya' && (
                <div className="space-y-3">
                  <Label htmlFor="p22a_alasan_tidak_sesuai_lainnya">22a - Tuliskan alasan lainnya:</Label>
                  <Input
                    id="p22a_alasan_tidak_sesuai_lainnya"
                    name="p22a_alasan_tidak_sesuai_lainnya"
                    placeholder="Masukkan alasan lainnya"
                    value={formData.p22a_alasan_tidak_sesuai_lainnya || ''}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>
          )}
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mereset formulir ini? Semua isian akan hilang.')) {
                setFormData(initialFormData);
                setSelectedFakultas('');
                setProdiOptions([]);
                setErrorMessage('');
                setSuccessMessage('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={isLoading}
          >
            Reset Formulir
          </Button>
          <Button type="submit" size="lg" className="inline-flex items-center gap-2" disabled={isLoading}>
            {isLoading ? 'Mengirim...' : (
              <>
                Kirim Jawaban
                <Send size={16} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
