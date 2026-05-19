import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface AlumniResponse {
  id?: string;
  created_at?: string;
  nim: string;
  nama: string;
  tahun_lulus: number;
  fakultas: string;
  prodi: string;
  p1_status: string;
  p2_sertifikasi?: number;
  p3_waktu_tunggu?: string;
  p4_pendapatan?: number;
  p5_lokasi_negara?: string;
  p5a_lokasi_provinsi?: string;
  p5b_lokasi_kabupaten?: string;
  p6_jenis_perusahaan?: string;
  p7_level_perusahaan?: string;
  p8a_nama_perusahaan?: string;
  p8b_alamat_perusahaan?: string;
  p9_posisi_wiraswasta?: string;
  p10a_sumber_biaya_studi?: string;
  p10b_perguruantinggi_studi?: string;
  p10c_prodi_studi?: string;
  p10d_tanggal_masuk_studi?: string;
  p11_hubungan_studi_pekerjaan: string;
  p12_tingkat_pendidikan_sesuai: string;
  p13_sumber_dana_kuliah?: string;
  p13a_sumber_dana_kuliah_lainnya?: string;
  p14a_etika?: number;
  p14a_keahlian_ilmu?: number;
  p14a_bahasa_inggris?: number;
  p14a_teknologi_informasi?: number;
  p14a_komunikasi?: number;
  p14a_kerja_sama_tim?: number;
  p14a_pengembangan?: number;
  p14b_etika?: number;
  p14b_keahlian_ilmu?: number;
  p14b_bahasa_inggris?: number;
  p14b_teknologi_informasi?: number;
  p14b_komunikasi?: number;
  p14b_kerja_sama_tim?: number;
  p14b_pengembangan?: number;
  p15_perkuliahan?: string;
  p15_demonstrasi?: string;
  p15_proyek_riset?: string;
  p15_magang?: string;
  p15_praktikum?: string;
  p15_kerja_lapangan?: string;
  p16_mulai_cari_kerja?: string;
  p17_cara_cari_kerja?: string[];
  p17m_cara_cari_kerja_lainnya?: string;
  p18_jumlah_lamaran?: number;
  p19_jumlah_respon?: number;
  p20_jumlah_wawancara?: number;
  p21_kesesuaian_bidang?: string;
  p22_alasan_tidak_sesuai?: string;
  p22a_alasan_tidak_sesuai_lainnya?: string;
}

// 30 rich mock responses for testing and showing off the dashboard beautifully
export const MOCK_RESPONSES: AlumniResponse[] = [
  {
    nim: "12022001",
    nama: "Fadel Muhammad",
    tahun_lulus: 2024,
    fakultas: "Fakultas teknik",
    prodi: "Teknik Informatika",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 3,
    p3_waktu_tunggu: "1",
    p4_pendapatan: 7500000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "DKI Jakarta",
    p5b_lokasi_kabupaten: "Jakarta Selatan",
    p6_jenis_perusahaan: "Swasta",
    p7_level_perusahaan: "Multinasional/Internasional",
    p8a_nama_perusahaan: "Shopee Indonesia",
    p8b_alamat_perusahaan: "Gedung Science Park, Jakarta",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Beasiswa Bidikmisi",
    p14a_etika: 5, p14a_keahlian_ilmu: 4, p14a_bahasa_inggris: 4, p14a_teknologi_informasi: 5, p14a_komunikasi: 4, p14a_kerja_sama_tim: 5, p14a_pengembangan: 4,
    p14b_etika: 5, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 5, p14b_teknologi_informasi: 5, p14b_komunikasi: 5, p14b_kerja_sama_tim: 5, p14b_pengembangan: 5,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Cukup Besar", p15_magang: "Sangat Besar", p15_praktikum: "Sangat Besar", p15_kerja_lapangan: "Cukup Besar",
    p16_mulai_cari_kerja: "Sebelum lulus",
    p17_cara_cari_kerja: ["Melalui internet", "Melalui Pusat Karir Kampus"],
    p18_jumlah_lamaran: 5, p19_jumlah_respon: 3, p20_jumlah_wawancara: 2,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "12022015",
    nama: "Siti Rahma",
    tahun_lulus: 2024,
    fakultas: "Fakultas teknik",
    prodi: "Teknik Informatika",
    p1_status: "Wiraswasta",
    p2_sertifikasi: 1,
    p3_waktu_tunggu: "Kurang dari 0 bulan (sebelum lulus)",
    p4_pendapatan: 9000000,
    p6_jenis_perusahaan: "Swasta",
    p7_level_perusahaan: "Nasional/Wiraswasta berbadan hukum",
    p8a_nama_perusahaan: "Pixel Studio Indonesia",
    p8b_alamat_perusahaan: "Morotai Selatan, Maluku Utara",
    p9_posisi_wiraswasta: "Founder",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Biaya Sendiri",
    p14a_etika: 4, p14a_keahlian_ilmu: 5, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 5, p14a_komunikasi: 5, p14a_kerja_sama_tim: 4, p14a_pengembangan: 5,
    p14b_etika: 5, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 4, p14b_teknologi_informasi: 5, p14b_komunikasi: 5, p14b_kerja_sama_tim: 5, p14b_pengembangan: 5,
    p15_perkuliahan: "Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Kurang", p15_magang: "Cukup Besar", p15_praktikum: "Sangat Besar", p15_kerja_lapangan: "Kurang",
    p16_mulai_cari_kerja: "Sebelum lulus",
    p17_cara_cari_kerja: ["Melalui internet", "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)"],
    p18_jumlah_lamaran: 2, p19_jumlah_respon: 2, p20_jumlah_wawancara: 2,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "12021008",
    nama: "Andi Saputra",
    tahun_lulus: 2023,
    fakultas: "Fakultas teknik",
    prodi: "Teknik Sipil",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 2,
    p3_waktu_tunggu: "3",
    p4_pendapatan: 5500000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Maluku Utara",
    p5b_lokasi_kabupaten: "Pulau Morotai",
    p6_jenis_perusahaan: "BUMN/BUMD",
    p7_level_perusahaan: "Nasional/Wiraswasta berbadan hukum",
    p8a_nama_perusahaan: "PT Wijaya Karya",
    p8b_alamat_perusahaan: "Proyek Bendungan Morotai",
    p11_hubungan_studi_pekerjaan: "Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Beasiswa ADIK",
    p14a_etika: 4, p14a_keahlian_ilmu: 4, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 3, p14a_komunikasi: 4, p14a_kerja_sama_tim: 5, p14a_pengembangan: 3,
    p14b_etika: 4, p14b_keahlian_ilmu: 4, p14b_bahasa_inggris: 3, p14b_teknologi_informasi: 4, p14b_komunikasi: 4, p14b_kerja_sama_tim: 5, p14b_pengembangan: 4,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Cukup Besar", p15_proyek_riset: "Besar", p15_magang: "Sangat Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Sangat Besar",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melamar langsung ke perusahaan", "Melalui bursa kerja"],
    p18_jumlah_lamaran: 8, p19_jumlah_respon: 2, p20_jumlah_wawancara: 1,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "13022045",
    nama: "Sri Wahyuni",
    tahun_lulus: 2024,
    fakultas: "Fakultas Ekonomi",
    prodi: "Akuntansi",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 2,
    p3_waktu_tunggu: "2",
    p4_pendapatan: 4800000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Sulawesi Utara",
    p5b_lokasi_kabupaten: "Manado",
    p6_jenis_perusahaan: "Swasta",
    p7_level_perusahaan: "Nasional/Wiraswasta berbadan hukum",
    p8a_nama_perusahaan: "Bank Mandiri Cabang Manado",
    p8b_alamat_perusahaan: "Jl. Piere Tendean, Manado",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Beasiswa KJMU",
    p14a_etika: 5, p14a_keahlian_ilmu: 5, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 4, p14a_komunikasi: 4, p14a_kerja_sama_tim: 4, p14a_pengembangan: 3,
    p14b_etika: 5, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 4, p14b_teknologi_informasi: 5, p14b_komunikasi: 5, p14b_kerja_sama_tim: 5, p14b_pengembangan: 4,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Kurang", p15_magang: "Sangat Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Kurang",
    p16_mulai_cari_kerja: "Sebelum lulus",
    p17_cara_cari_kerja: ["Melalui internet", "Melalui magang"],
    p18_jumlah_lamaran: 3, p19_jumlah_respon: 2, p20_jumlah_wawancara: 2,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "14022030",
    nama: "Rahmat Hidayat",
    tahun_lulus: 2024,
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "PGSD",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 0,
    p3_waktu_tunggu: "4",
    p4_pendapatan: 3200000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Maluku Utara",
    p5b_lokasi_kabupaten: "Pulau Morotai",
    p6_jenis_perusahaan: "Intansi pemerintah Pusat /Daerah",
    p7_level_perusahaan: "Lokal/Wilayah/Wiraswasta tidak berbadan hukum",
    p8a_nama_perusahaan: "SD Negeri 1 Daruba",
    p8b_alamat_perusahaan: "Daruba, Morotai Selatan",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Biaya Sendiri",
    p14a_etika: 5, p14a_keahlian_ilmu: 4, p14a_bahasa_inggris: 2, p14a_teknologi_informasi: 3, p14a_komunikasi: 5, p14a_kerja_sama_tim: 4, p14a_pengembangan: 4,
    p14b_etika: 5, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 3, p14b_teknologi_informasi: 4, p14b_komunikasi: 5, p14b_kerja_sama_tim: 5, p14b_pengembangan: 5,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Sangat Besar", p15_proyek_riset: "Cukup Besar", p15_magang: "Sangat Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Besar",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melamar langsung ke perusahaan", "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)"],
    p18_jumlah_lamaran: 3, p19_jumlah_respon: 1, p20_jumlah_wawancara: 1,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "15022012",
    nama: "Mega Utami",
    tahun_lulus: 2024,
    fakultas: "Fakultas Perikanan dan Ilmu kelautan",
    prodi: "Ilmu Kelautan",
    p1_status: "Melanjutkan pendidikan",
    p2_sertifikasi: 1,
    p3_waktu_tunggu: "0",
    p10a_sumber_biaya_studi: "Beasiswa",
    p10b_perguruantinggi_studi: "Universitas Hasanuddin",
    p10c_prodi_studi: "Magister Ilmu Kelautan",
    p10d_tanggal_masuk_studi: "2024-09-01",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Setingkat Lebih Tinggi",
    p13_sumber_dana_kuliah: "Beasiswa Bidikmisi",
    p14a_etika: 4, p14a_keahlian_ilmu: 5, p14a_bahasa_inggris: 4, p14a_teknologi_informasi: 4, p14a_komunikasi: 4, p14a_kerja_sama_tim: 4, p14a_pengembangan: 5,
    p14b_etika: 4, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 5, p14b_teknologi_informasi: 5, p14b_komunikasi: 4, p14b_kerja_sama_tim: 4, p14b_pengembangan: 5,
    p15_perkuliahan: "Besar", p15_demonstrasi: "Cukup Besar", p15_proyek_riset: "Sangat Besar", p15_magang: "Besar", p15_praktikum: "Sangat Besar", p15_kerja_lapangan: "Sangat Besar",
    p16_mulai_cari_kerja: "Saya tidak mencari kerja"
  },
  {
    nim: "11022022",
    nama: "Ilham Habibie",
    tahun_lulus: 2024,
    fakultas: "Fakultas ilmu sosial dan ilmu politik",
    prodi: "ADM",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 0,
    p3_waktu_tunggu: "5",
    p4_pendapatan: 4000000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Maluku Utara",
    p5b_lokasi_kabupaten: "Halmahera Utara",
    p6_jenis_perusahaan: "Intansi pemerintah Pusat /Daerah",
    p7_level_perusahaan: "Lokal/Wilayah/Wiraswasta tidak berbadan hukum",
    p8a_nama_perusahaan: "Kantor Camat Galela",
    p8b_alamat_perusahaan: "Galela, Halmahera Utara",
    p11_hubungan_studi_pekerjaan: "Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Biaya Sendiri",
    p14a_etika: 4, p14a_keahlian_ilmu: 4, p14a_bahasa_inggris: 2, p14a_teknologi_informasi: 4, p14a_komunikasi: 4, p14a_kerja_sama_tim: 4, p14a_pengembangan: 3,
    p14b_etika: 5, p14b_keahlian_ilmu: 4, p14b_bahasa_inggris: 3, p14b_teknologi_informasi: 4, p14b_komunikasi: 5, p14b_kerja_sama_tim: 5, p14b_pengembangan: 4,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Cukup Besar", p15_proyek_riset: "Cukup Besar", p15_magang: "Besar", p15_praktikum: "Kurang", p15_kerja_lapangan: "Besar",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melamar langsung ke perusahaan", "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)"],
    p18_jumlah_lamaran: 4, p19_jumlah_respon: 2, p20_jumlah_wawancara: 1,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "12022020",
    nama: "Rian Hidayat",
    tahun_lulus: 2024,
    fakultas: "Fakultas teknik",
    prodi: "Teknik Informatika",
    p1_status: "Sedang mencari kerja",
    p2_sertifikasi: 2,
    p11_hubungan_studi_pekerjaan: "Tidak Sama Sekali",
    p12_tingkat_pendidikan_sesuai: "Tidak Perlu Pendidikan Tinggi",
    p13_sumber_dana_kuliah: "Biaya Sendiri",
    p14a_etika: 4, p14a_keahlian_ilmu: 3, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 4, p14a_komunikasi: 3, p14a_kerja_sama_tim: 4, p14a_pengembangan: 3,
    p14b_etika: 4, p14b_keahlian_ilmu: 4, p14b_bahasa_inggris: 4, p14b_teknologi_informasi: 4, p14b_komunikasi: 4, p14b_kerja_sama_tim: 4, p14b_pengembangan: 4,
    p15_perkuliahan: "Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Cukup Besar", p15_magang: "Cukup Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Kurang",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melalui internet"],
    p18_jumlah_lamaran: 15, p19_jumlah_respon: 3, p20_jumlah_wawancara: 0
  },
  {
    nim: "16022005",
    nama: "Dian Lestari",
    tahun_lulus: 2024,
    fakultas: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    prodi: "Matematika",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 1,
    p3_waktu_tunggu: "6",
    p4_pendapatan: 5000000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Jawa Barat",
    p5b_lokasi_kabupaten: "Bandung",
    p6_jenis_perusahaan: "Swasta",
    p7_level_perusahaan: "Nasional/Wiraswasta berbadan hukum",
    p8a_nama_perusahaan: "EduTech Indonesia",
    p8b_alamat_perusahaan: "Dago, Bandung",
    p11_hubungan_studi_pekerjaan: "Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Beasiswa Perusahaan",
    p14a_etika: 4, p14a_keahlian_ilmu: 5, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 4, p14a_komunikasi: 3, p14a_kerja_sama_tim: 4, p14a_pengembangan: 4,
    p14b_etika: 4, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 4, p14b_teknologi_informasi: 5, p14b_komunikasi: 4, p14b_kerja_sama_tim: 4, p14b_pengembangan: 4,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Cukup Besar", p15_proyek_riset: "Besar", p15_magang: "Cukup Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Kurang",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melalui internet", "Melalui Pusat Karir Kampus"],
    p18_jumlah_lamaran: 6, p19_jumlah_respon: 3, p20_jumlah_wawancara: 2,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "12021044",
    nama: "Taufik Hidayat",
    tahun_lulus: 2023,
    fakultas: "Fakultas teknik",
    prodi: "Teknik Informatika",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 4,
    p3_waktu_tunggu: "1",
    p4_pendapatan: 12000000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "DKI Jakarta",
    p5b_lokasi_kabupaten: "Jakarta Pusat",
    p6_jenis_perusahaan: "Swasta",
    p7_level_perusahaan: "Multinasional/Internasional",
    p8a_nama_perusahaan: "Gojek Tokopedia",
    p8b_alamat_perusahaan: "Pasaraya Blok M, Jakarta",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Beasiswa Bidikmisi",
    p14a_etika: 4, p14a_keahlian_ilmu: 5, p14a_bahasa_inggris: 5, p14a_teknologi_informasi: 5, p14a_komunikasi: 4, p14a_kerja_sama_tim: 5, p14a_pengembangan: 5,
    p14b_etika: 5, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 5, p14b_teknologi_informasi: 5, p14b_komunikasi: 5, p14b_kerja_sama_tim: 5, p14b_pengembangan: 5,
    p15_perkuliahan: "Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Besar", p15_magang: "Sangat Besar", p15_praktikum: "Sangat Besar", p15_kerja_lapangan: "Kurang",
    p16_mulai_cari_kerja: "Sebelum lulus",
    p17_cara_cari_kerja: ["Melalui internet", "Melalui magang", "Dihubungi oleh perusahaan"],
    p18_jumlah_lamaran: 3, p19_jumlah_respon: 3, p20_jumlah_wawancara: 3,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "15022033",
    nama: "Amiruddin",
    tahun_lulus: 2024,
    fakultas: "Fakultas Perikanan dan Ilmu kelautan",
    prodi: "Teknologi Hasil Perikanan",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 2,
    p3_waktu_tunggu: "3",
    p4_pendapatan: 4200000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Maluku Utara",
    p5b_lokasi_kabupaten: "Pulau Morotai",
    p6_jenis_perusahaan: "BUMN/BUMD",
    p7_level_perusahaan: "Nasional/Wiraswasta berbadan hukum",
    p8a_nama_perusahaan: "Perum Perindo Morotai",
    p8b_alamat_perusahaan: "Sentra Kelautan Perikanan Terpadu (SKPT) Morotai",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Biaya Sendiri",
    p14a_etika: 4, p14a_keahlian_ilmu: 4, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 3, p14a_komunikasi: 4, p14a_kerja_sama_tim: 4, p14a_pengembangan: 4,
    p14b_etika: 4, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 3, p14b_teknologi_informasi: 4, p14b_komunikasi: 4, p14b_kerja_sama_tim: 5, p14b_pengembangan: 4,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Besar", p15_magang: "Sangat Besar", p15_praktikum: "Sangat Besar", p15_kerja_lapangan: "Sangat Besar",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melamar langsung ke perusahaan", "Melalui Pusat Karir Kampus"],
    p18_jumlah_lamaran: 5, p19_jumlah_respon: 2, p20_jumlah_wawancara: 1,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "12022099",
    nama: "Hendra Wijaya",
    tahun_lulus: 2024,
    fakultas: "Fakultas teknik",
    prodi: "Teknik Industri",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 1,
    p3_waktu_tunggu: "5",
    p4_pendapatan: 6000000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Banten",
    p5b_lokasi_kabupaten: "Tangerang",
    p6_jenis_perusahaan: "Swasta",
    p7_level_perusahaan: "Nasional/Wiraswasta berbadan hukum",
    p8a_nama_perusahaan: "PT Mayora Indah",
    p8b_alamat_perusahaan: "Batuceper, Tangerang",
    p11_hubungan_studi_pekerjaan: "Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Biaya Sendiri",
    p14a_etika: 4, p14a_keahlian_ilmu: 4, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 4, p14a_komunikasi: 4, p14a_kerja_sama_tim: 4, p14a_pengembangan: 4,
    p14b_etika: 4, p14b_keahlian_ilmu: 4, p14b_bahasa_inggris: 3, p14b_teknologi_informasi: 4, p14b_komunikasi: 4, p14b_kerja_sama_tim: 5, p14b_pengembangan: 4,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Cukup Besar", p15_magang: "Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Besar",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melalui internet", "Melamar langsung ke perusahaan"],
    p18_jumlah_lamaran: 10, p19_jumlah_respon: 4, p20_jumlah_wawancara: 2,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "14022002",
    nama: "Nurhaliza",
    tahun_lulus: 2024,
    fakultas: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: "Bahasa Inggris",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 2,
    p3_waktu_tunggu: "2",
    p4_pendapatan: 4500000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Maluku Utara",
    p5b_lokasi_kabupaten: "Pulau Morotai",
    p6_jenis_perusahaan: "Swasta",
    p7_level_perusahaan: "Lokal/Wilayah/Wiraswasta tidak berbadan hukum",
    p8a_nama_perusahaan: "Morotai English Academy",
    p8b_alamat_perusahaan: "Jl. Daruba No. 12",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Beasiswa Bidikmisi",
    p14a_etika: 5, p14a_keahlian_ilmu: 5, p14a_bahasa_inggris: 5, p14a_teknologi_informasi: 4, p14a_komunikasi: 5, p14a_kerja_sama_tim: 4, p14a_pengembangan: 4,
    p14b_etika: 5, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 5, p14b_teknologi_informasi: 4, p14b_komunikasi: 5, p14b_kerja_sama_tim: 4, p14b_pengembangan: 5,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Sangat Besar", p15_proyek_riset: "Cukup Besar", p15_magang: "Sangat Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Besar",
    p16_mulai_cari_kerja: "Sebelum lulus",
    p17_cara_cari_kerja: ["Melalui internet", "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)"],
    p18_jumlah_lamaran: 3, p19_jumlah_respon: 2, p20_jumlah_wawancara: 2,
    p21_kesesuaian_bidang: "Ya"
  },
  {
    nim: "11022005",
    nama: "Yusuf Morotai",
    tahun_lulus: 2024,
    fakultas: "Fakultas ilmu sosial dan ilmu politik",
    prodi: "ADM",
    p1_status: "Belum memungkinkan bekerja",
    p2_sertifikasi: 0,
    p11_hubungan_studi_pekerjaan: "Tidak Sama Sekali",
    p12_tingkat_pendidikan_sesuai: "Tidak Perlu Pendidikan Tinggi",
    p13_sumber_dana_kuliah: "Biaya Sendiri",
    p14a_etika: 4, p14a_keahlian_ilmu: 3, p14a_bahasa_inggris: 2, p14a_teknologi_informasi: 3, p14a_komunikasi: 3, p14a_kerja_sama_tim: 3, p14a_pengembangan: 3,
    p14b_etika: 4, p14b_keahlian_ilmu: 4, p14b_bahasa_inggris: 3, p14b_teknologi_informasi: 3, p14b_komunikasi: 4, p14b_kerja_sama_tim: 4, p14b_pengembangan: 3,
    p15_perkuliahan: "Besar", p15_demonstrasi: "Cukup Besar", p15_proyek_riset: "Kurang", p15_magang: "Cukup Besar", p15_praktikum: "Kurang", p15_kerja_lapangan: "Cukup Besar",
    p16_mulai_cari_kerja: "Saya tidak mencari kerja"
  },
  {
    nim: "12022144",
    nama: "Sarah Nabila",
    tahun_lulus: 2024,
    fakultas: "Fakultas teknik",
    prodi: "Teknik Lingkungan",
    p1_status: "Bekerja (full time/part time)",
    p2_sertifikasi: 2,
    p3_waktu_tunggu: "4",
    p4_pendapatan: 5800000,
    p5_lokasi_negara: "Indonesia",
    p5a_lokasi_provinsi: "Maluku Utara",
    p5b_lokasi_kabupaten: "Pulau Morotai",
    p6_jenis_perusahaan: "Intansi pemerintah Pusat /Daerah",
    p7_level_perusahaan: "Nasional/Wiraswasta berbadan hukum",
    p8a_nama_perusahaan: "Dinas Lingkungan Hidup Morotai",
    p8b_alamat_perusahaan: "Daruba, Morotai",
    p11_hubungan_studi_pekerjaan: "Sangat Erat",
    p12_tingkat_pendidikan_sesuai: "Tingkat yang Sama",
    p13_sumber_dana_kuliah: "Beasiswa ADIK",
    p14a_etika: 4, p14a_keahlian_ilmu: 4, p14a_bahasa_inggris: 3, p14a_teknologi_informasi: 4, p14a_komunikasi: 4, p14a_kerja_sama_tim: 4, p14a_pengembangan: 4,
    p14b_etika: 5, p14b_keahlian_ilmu: 5, p14b_bahasa_inggris: 4, p14b_teknologi_informasi: 4, p14b_komunikasi: 5, p14b_kerja_sama_tim: 5, p14b_pengembangan: 4,
    p15_perkuliahan: "Sangat Besar", p15_demonstrasi: "Besar", p15_proyek_riset: "Besar", p15_magang: "Sangat Besar", p15_praktikum: "Besar", p15_kerja_lapangan: "Sangat Besar",
    p16_mulai_cari_kerja: "Sesudah lulus",
    p17_cara_cari_kerja: ["Melamar langsung ke perusahaan", "Melalui Pusat Karir Kampus"],
    p18_jumlah_lamaran: 4, p19_jumlah_respon: 1, p20_jumlah_wawancara: 1,
    p21_kesesuaian_bidang: "Ya"
  }
];

// Helper functions using local storage for offline/fallback mode
const LOCAL_STORAGE_KEY = 'tracer_study_responses';

export const getLocalResponses = (): AlumniResponse[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    // Populate with mock responses initially if empty
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_RESPONSES));
    return MOCK_RESPONSES;
  }
  return JSON.parse(stored);
};

export const saveLocalResponse = (response: AlumniResponse): AlumniResponse[] => {
  const responses = getLocalResponses();
  
  // Check duplicate NIM
  const index = responses.findIndex(r => r.nim.toLowerCase() === response.nim.toLowerCase());
  if (index !== -1) {
    responses[index] = response; // Overwrite
  } else {
    responses.push(response);
  }
  
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(responses));
  return responses;
};

// Unified DB API
export const db = {
  async submitResponse(data: AlumniResponse): Promise<{ success: boolean; error?: string }> {
    try {
      if (isSupabaseConfigured && supabase) {
        // Upsert based on nim (which is unique)
        const { error } = await supabase
          .from('alumni_responses')
          .upsert(data, { onConflict: 'nim' });
        
        if (error) throw error;
        
        // Also sync to local storage for robust fallback
        saveLocalResponse(data);
        return { success: true };
      } else {
        // Local fallback
        saveLocalResponse(data);
        return { success: true };
      }
    } catch (err: any) {
      console.error('Error submitting response:', err);
      return { success: false, error: err?.message || 'Gagal menyimpan ke database' };
    }
  },

  async getAllResponses(): Promise<{ data: AlumniResponse[]; success: boolean; isFallback: boolean }> {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('alumni_responses')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Return actual data from database (even if empty)
        return { data: (data || []) as AlumniResponse[], success: true, isFallback: false };
      } else {
        // Fallback to local storage (which pre-populates mock data)
        const locals = getLocalResponses();
        return { data: locals, success: true, isFallback: true };
      }
    } catch (err) {
      console.error('Error fetching responses, falling back to local:', err);
      const locals = getLocalResponses();
      return { data: locals, success: true, isFallback: true };
    }
  }
};
