export interface ProgramStudi {
  id: string;
  name: string;
}

export interface Fakultas {
  name: string;
  prodi: ProgramStudi[];
}

export const FAKULTAS_LIST: Fakultas[] = [
  {
    name: "Fakultas ilmu sosial dan ilmu politik",
    prodi: [
      { id: "adm", name: "ADM" }
    ]
  },
  {
    name: "Fakultas Ekonomi",
    prodi: [
      { id: "akuntansi", name: "Akuntansi" }
    ]
  },
  {
    name: "Fakultas Keguruan dan Ilmu Pendidikan",
    prodi: [
      { id: "bahasa_inggris", name: "Bahasa Inggris" },
      { id: "pgsd", name: "PGSD" }
    ]
  },
  {
    name: "Fakultas Perikanan dan Ilmu kelautan",
    prodi: [
      { id: "teknologi_hasil_perikanan", name: "Teknologi Hasil Perikanan" },
      { id: "ilmu_kelautan", name: "Ilmu Kelautan" }
    ]
  },
  {
    name: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    prodi: [
      { id: "matematika", name: "Matematika" }
    ]
  },
  {
    name: "fakultas teknik",
    prodi: [
      { id: "teknik_industri", name: "Teknik Industri" },
      { id: "teknik_informatika", name: "Teknik Informatika" },
      { id: "teknik_lingkungan", name: "Teknik Lingkungan" },
      { id: "teknik_sipil", name: "Teknik Sipil" }
    ]
  }
];

export const TAHUN_LULUS_OPTIONS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

export const STATUS_ALUMNI_OPTIONS = [
  "Bekerja (full time/part time)",
  "Belum memungkinkan bekerja",
  "Wiraswasta",
  "Melanjutkan pendidikan",
  "Sedang mencari kerja"
];

export const SERTIFIKASI_OPTIONS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const WAKTU_TUNGGU_OPTIONS = [
  "Kurang dari 0 bulan (sebelum lulus)",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",
  "Lebih dari 12 bulan"
];

export const JENIS_PERUSAHAAN_OPTIONS = [
  "Intansi pemerintah Pusat /Daerah",
  "BUMN/BUMD",
  "Swasta"
];

export const LEVEL_PERUSAHAAN_OPTIONS = [
  "Lokal/Wilayah/Wiraswasta tidak berbadan hukum",
  "Nasional/Wiraswasta berbadan hukum",
  "Multinasional/Internasional"
];

export const POSISI_WIRASWASTA_OPTIONS = [
  "Founder",
  "Co-Founder",
  "Staff",
  "Freelance/Kerja Lepas"
];

export const BIAYA_STUDI_LANJUT_OPTIONS = [
  "Biaya Sendiri",
  "Beasiswa"
];

export const HUBUNGAN_STUDI_PEKERJAAN_OPTIONS = [
  "Sangat Erat",
  "Erat",
  "Cukup Erat",
  "Kurang Erat",
  "Tidak Sama Sekali"
];

export const TINGKAT_PENDIDIKAN_SESUAI_OPTIONS = [
  "Setingkat Lebih Tinggi",
  "Tingkat yang Sama",
  "Setingkat Lebih Rendah",
  "Tidak Perlu Pendidikan Tinggi"
];

export const SUMBER_DANA_KULIAH_OPTIONS = [
  "Biaya Sendiri",
  "Beasiswa KIP Kuliah",
  "Beasiswa Pemda Morotai",
  "Beasiswa Maluku Utara Bangkit",
  "Beasiswa Perusahaan",
  "Lainnya"
];

export const METODE_PEMBELAJARAN_LIST = [
  { id: "p15_perkuliahan", label: "Pekuliahan" },
  { id: "p15_demonstrasi", label: "Demonstrasi" },
  { id: "p15_proyek_riset", label: "Partisipasi dalam proyek riset" },
  { id: "p15_magang", label: "Magang" },
  { id: "p15_praktikum", label: "Praktikum" },
  { id: "p15_kerja_lapangan", label: "Kerja Lapangan" }
];

export const METODE_PEMBELAJARAN_OPTIONS = [
  "Sangat Besar",
  "Besar",
  "Cukup Besar",
  "Kurang",
  "Tidak Sama Sekali"
];

export const KOMPETENSI_LIST = [
  { id: "etika", label: "Etika" },
  { id: "keahlian_ilmu", label: "Keahlian Berdasarkan Bidang Ilmu" },
  { id: "bahasa_inggris", label: "Bahasa Inggris" },
  { id: "teknologi_informasi", label: "Penggunaan teknologi Informasi" },
  { id: "komunikasi", label: "Komunikasi" },
  { id: "kerja_sama_tim", label: "Kerja Sama Tim" },
  { id: "pengembangan", label: "Pengembangan" }
];

export const CARI_KERJA_OPTIONS = [
  "Sebelum lulus",
  "Sesudah lulus",
  "Saya tidak mencari kerja"
];

export const CARA_CARI_KERJA_OPTIONS = [
  "Melalui iklan",
  "Melamar langsung ke perusahaan",
  "Melalui bursa kerja",
  "Melalui internet",
  "Dihubungi oleh perusahaan",
  "Melalui Kemenakertrans",
  "Melalui agen tenaga kerja",
  "Melalui Pusat Karir Kampus",
  "Melalui relasi (misalnya dosen, orang tua, saudara, teman, dll.)",
  "Melalui magang",
  "Meneruskan pekerjaan yang sama, semasa kuliah",
  "Lainnya"
];

export const ALASAN_TIDAK_SESUAI_OPTIONS = [
  "Belum mendapatkan pekerjaan yang lebih sesuai.",
  "Prospek karir yang baik.",
  "Lebih senang bekerja di area pekerjaan yang tidak berhubungan dengan pendidikan.",
  "Dipromosikan ke posisi yang lebih baik",
  "Memperoleh pendapatan yang lebih tinggi.",
  "Lebih aman/terjamin/secure/menarik",
  "Dapat mengambil pekerjaan tambahan",
  "Lokasinya lebih dekat dari rumah.",
  "Sejak awal karir, pekerjaan saya tidak berhubungan dengan Pendidikan.",
  "Lainnya"
];

export const PROVINSI_INDONESIA = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta",
  "Jawa Barat",
  "Banten",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua Barat",
  "Papua",
  "Papua Tengah",
  "Papua Pegunungan",
  "Papua Selatan",
  "Papua Barat Daya"
];
