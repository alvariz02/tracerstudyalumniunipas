-- Schema for Tracer Study Alumni UNIPAS
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS alumni_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Identitas Pengisi
    nim VARCHAR(50) NOT NULL UNIQUE,
    nama VARCHAR(255) NOT NULL,
    tahun_lulus INTEGER NOT NULL,
    fakultas VARCHAR(255) NOT NULL,
    prodi VARCHAR(255) NOT NULL,
    
    -- Pertanyaan IKU, IKT, Akreditasi
    p1_status VARCHAR(100) NOT NULL, -- Bekerja, Belum memungkinkan bekerja, Wiraswasta, Melanjutkan pendidikan, Sedang mencari kerja
    p2_sertifikasi INTEGER,
    p3_waktu_tunggu VARCHAR(100),
    p4_pendapatan NUMERIC,
    
    p5_lokasi_negara VARCHAR(100),
    p5a_lokasi_provinsi VARCHAR(100),
    p5b_lokasi_kabupaten VARCHAR(100),
    
    p6_jenis_perusahaan VARCHAR(100),
    p7_level_perusahaan VARCHAR(100),
    p8a_nama_perusahaan VARCHAR(255),
    p8b_alamat_perusahaan TEXT,
    
    p9_posisi_wiraswasta VARCHAR(100),
    
    p10a_sumber_biaya_studi VARCHAR(100),
    p10b_perguruantinggi_studi VARCHAR(255),
    p10c_prodi_studi VARCHAR(255),
    p10d_tanggal_masuk_studi DATE,
    
    p11_hubungan_studi_pekerjaan VARCHAR(100) NOT NULL,
    p12_tingkat_pendidikan_sesuai VARCHAR(100) NOT NULL,
    
    p13_sumber_dana_kuliah VARCHAR(100),
    p13a_sumber_dana_kuliah_lainnya VARCHAR(255),
    
    -- 14a Kompetensi saat lulus (1-5)
    p14a_etika INTEGER,
    p14a_keahlian_ilmu INTEGER,
    p14a_bahasa_inggris INTEGER,
    p14a_teknologi_informasi INTEGER,
    p14a_komunikasi INTEGER,
    p14a_kerja_sama_tim INTEGER,
    p14a_pengembangan INTEGER,
    
    -- 14b Kompetensi saat ini diperlukan (1-5)
    p14b_etika INTEGER,
    p14b_keahlian_ilmu INTEGER,
    p14b_bahasa_inggris INTEGER,
    p14b_teknologi_informasi INTEGER,
    p14b_komunikasi INTEGER,
    p14b_kerja_sama_tim INTEGER,
    p14b_pengembangan INTEGER,
    
    -- 15 Penekanan metode pembelajaran
    p15_perkuliahan VARCHAR(100),
    p15_demonstrasi VARCHAR(100),
    p15_proyek_riset VARCHAR(100),
    p15_magang VARCHAR(100),
    p15_praktikum VARCHAR(100),
    p15_kerja_lapangan VARCHAR(100),
    
    -- 16 & 17
    p16_mulai_cari_kerja VARCHAR(100),
    p17_cara_cari_kerja TEXT[], -- Array of strings
    p17m_cara_cari_kerja_lainnya VARCHAR(255),
    
    p18_jumlah_lamaran INTEGER,
    p19_jumlah_respon INTEGER,
    p20_jumlah_wawancara INTEGER,
    
    p21_kesesuaian_bidang VARCHAR(100),
    p22_alasan_tidak_sesuai VARCHAR(255),
    p22a_alasan_tidak_sesuai_lainnya VARCHAR(255)
);

-- Enable RLS (Row Level Security)
ALTER TABLE alumni_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous insertions (for alumni submission)
CREATE POLICY "Allow anon insert" ON alumni_responses 
    FOR INSERT 
    WITH CHECK (true);

-- Create policy to allow select access (for the analytics dashboard)
-- Note: In a production app, you might want to secure the dashboard with authentication.
CREATE POLICY "Allow select for everyone" ON alumni_responses
    FOR SELECT
    USING (true);
