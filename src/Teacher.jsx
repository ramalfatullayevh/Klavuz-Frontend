import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, BookOpen, BarChart3, TrendingUp, PieChart, Target, 
  Calendar, Star, Award, Filter, Search, ChevronDown, ChevronRight,
  Eye, MessageCircle, Mail, Phone, MapPin, Clock,
  Book, GraduationCap, CheckCircle, X, Download, Share2,
  MoreVertical, ArrowUp, ArrowDown, Minus, Sparkles, Flame,
  Play, Pause, Settings, Bell, Home, Plus, Edit3, Trash2,
  Activity, Zap, Trophy, Medal, Crown, FileText, Calculator,
  Globe, Beaker, Bookmark, ChevronLeft, Printer, FileDown,
  FileUp, FileCheck, ClipboardList, BarChart
} from 'lucide-react';

// PDF oluşturma yardımcı fonksiyonları
const generatePDF = (content, title = 'Öğretmen Raporu') => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          margin: 0; 
          padding: 20px; 
          color: #333;
          background: white;
        }
        .header { 
          text-align: center; 
          border-bottom: 3px solid #f97316; 
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 { 
          color: #f97316; 
          margin: 0;
          font-size: 28px;
        }
        .header .subtitle { 
          color: #666; 
          font-size: 16px;
        }
        .stats-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 15px; 
          margin-bottom: 30px;
        }
        .stat-card { 
          border: 1px solid #ddd; 
          padding: 15px; 
          border-radius: 8px;
          text-align: center;
          background: #f8fafc;
        }
        .stat-value { 
          font-size: 24px; 
          font-weight: bold; 
          color: #f97316;
          margin: 10px 0;
        }
        .student-table { 
          width: 100%; 
          border-collapse: collapse; 
          margin: 20px 0;
        }
        .student-table th, .student-table td { 
          border: 1px solid #ddd; 
          padding: 12px; 
          text-align: left;
        }
        .student-table th { 
          background: #f97316; 
          color: white;
        }
        .performance-badge { 
          padding: 4px 8px; 
          border-radius: 12px; 
          font-size: 12px;
          display: inline-block;
        }
        .chart-placeholder {
          background: #f8fafc;
          border: 1px dashed #ddd;
          padding: 40px;
          text-align: center;
          margin: 20px 0;
          border-radius: 8px;
        }
        .course-progress {
          background: #e5e7eb;
          height: 10px;
          border-radius: 5px;
          margin: 5px 0;
        }
        .course-progress-bar {
          height: 100%;
          border-radius: 5px;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        @media print {
          body { margin: 0; padding: 10px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <div class="subtitle">8. Sınıf - Matematik Öğretmeni | ${new Date().toLocaleDateString('tr-TR')}</div>
      </div>
      ${content}
      <div class="footer">
        Bu rapor öğretmen paneli tarafından otomatik olarak oluşturulmuştur.
      </div>
      <script>
        window.onload = function() {
          window.print();
          setTimeout(() => window.close(), 1000);
        }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
};

export default function TeacherDashboard() {
  const [animatedElements, setAnimatedElements] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [activeView, setActiveView] = useState('dashboard');
  const [expandedAnalysis, setExpandedAnalysis] = useState(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [chartType, setChartType] = useState('bar');
  const [courseChartType, setCourseChartType] = useState('bar');
  const [reportTemplates, setReportTemplates] = useState([
    { id: 1, name: 'Sınıf Genel Raporu', icon: <Users className="w-5 h-5" /> },
    { id: 2, name: 'Detaylı Analiz Raporu', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 3, name: 'Öğrenci Performans Raporu', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 4, name: 'Ders Bazlı Rapor', icon: <BookOpen className="w-5 h-5" /> }
  ]);
  const exportMenuRef = useRef(null);

  useEffect(() => {
    setAnimatedElements(true);
    
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setExportMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Öğrenci verileri
  const students = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      grade: '8. Sınıf',
      avatar: '👦',
      performance: 85,
      progress: 12,
      attendance: 95,
      completedSubjects: 24,
      totalSubjects: 30,
      streak: 15,
      lastActive: '2 saat önce',
      contact: {
        phone: '+90 555 123 4567',
        email: 'ahmet@email.com',
        address: 'İstanbul, Kadıköy'
      },
      courses: [
        { name: 'Matematik', progress: 78, performance: 82, color: 'from-blue-500 to-blue-600' },
        { name: 'Türkçe', progress: 92, performance: 88, color: 'from-red-500 to-red-600' },
        { name: 'Fen Bilimleri', progress: 65, performance: 72, color: 'from-green-500 to-green-600' },
        { name: 'Sosyal Bilgiler', progress: 85, performance: 79, color: 'from-purple-500 to-purple-600' }
      ],
      studyPlan: {
        dailyTarget: 25,
        weeklyTarget: 150,
        completedThisWeek: 120
      },
      analytics: {
        averageScore: 78,
        improvement: 12,
        rank: 3,
        totalQuestions: 1250,
        correctAnswers: 980,
        weeklyActivity: [85, 92, 78, 88, 95, 82, 90]
      }
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      grade: '8. Sınıf',
      avatar: '👧',
      performance: 92,
      progress: 8,
      attendance: 98,
      completedSubjects: 28,
      totalSubjects: 30,
      streak: 22,
      lastActive: '5 dakika önce',
      contact: {
        phone: '+90 555 234 5678',
        email: 'ayse@email.com',
        address: 'Ankara, Çankaya'
      },
      courses: [
        { name: 'Matematik', progress: 95, performance: 94, color: 'from-blue-500 to-blue-600' },
        { name: 'Türkçe', progress: 88, performance: 90, color: 'from-red-500 to-red-600' },
        { name: 'Fen Bilimleri', progress: 92, performance: 89, color: 'from-green-500 to-green-600' },
        { name: 'Sosyal Bilgiler', progress: 90, performance: 87, color: 'from-purple-500 to-purple-600' }
      ],
      studyPlan: {
        dailyTarget: 30,
        weeklyTarget: 180,
        completedThisWeek: 175
      },
      analytics: {
        averageScore: 92,
        improvement: 8,
        rank: 1,
        totalQuestions: 1560,
        correctAnswers: 1435,
        weeklyActivity: [95, 98, 92, 96, 94, 97, 99]
      }
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      grade: '8. Sınıf',
      avatar: '👦',
      performance: 68,
      progress: 15,
      attendance: 87,
      completedSubjects: 18,
      totalSubjects: 30,
      streak: 5,
      lastActive: '1 gün önce',
      contact: {
        phone: '+90 555 345 6789',
        email: 'mehmet@email.com',
        address: 'İzmir, Karşıyaka'
      },
      courses: [
        { name: 'Matematik', progress: 55, performance: 60, color: 'from-blue-500 to-blue-600' },
        { name: 'Türkçe', progress: 72, performance: 68, color: 'from-red-500 to-red-600' },
        { name: 'Fen Bilimleri', progress: 65, performance: 62, color: 'from-green-500 to-green-600' },
        { name: 'Sosyal Bilgiler', progress: 70, performance: 65, color: 'from-purple-500 to-purple-600' }
      ],
      studyPlan: {
        dailyTarget: 20,
        weeklyTarget: 120,
        completedThisWeek: 85
      },
      analytics: {
        averageScore: 68,
        improvement: 15,
        rank: 12,
        totalQuestions: 890,
        correctAnswers: 605,
        weeklyActivity: [45, 52, 68, 72, 65, 78, 82]
      }
    },
    {
      id: 4,
      name: 'Zeynep Şahin',
      grade: '8. Sınıf',
      avatar: '👧',
      performance: 76,
      progress: 20,
      attendance: 92,
      completedSubjects: 22,
      totalSubjects: 30,
      streak: 8,
      lastActive: '3 saat önce',
      contact: {
        phone: '+90 555 456 7890',
        email: 'zeynep@email.com',
        address: 'Bursa, Nilüfer'
      },
      courses: [
        { name: 'Matematik', progress: 70, performance: 72, color: 'from-blue-500 to-blue-600' },
        { name: 'Türkçe', progress: 82, performance: 78, color: 'from-red-500 to-red-600' },
        { name: 'Fen Bilimleri', progress: 75, performance: 74, color: 'from-green-500 to-green-600' },
        { name: 'Sosyal Bilgiler', progress: 78, performance: 76, color: 'from-purple-500 to-purple-600' }
      ],
      studyPlan: {
        dailyTarget: 22,
        weeklyTarget: 132,
        completedThisWeek: 110
      },
      analytics: {
        averageScore: 76,
        improvement: 20,
        rank: 7,
        totalQuestions: 1120,
        correctAnswers: 851,
        weeklyActivity: [72, 75, 78, 82, 85, 88, 92]
      }
    }
  ];

  // İstatistikler
  const classStats = {
    totalStudents: students.length,
    averagePerformance: Math.round(students.reduce((sum, student) => sum + student.performance, 0) / students.length),
    totalQuestions: students.reduce((sum, student) => sum + student.analytics.totalQuestions, 0),
    averageAttendance: Math.round(students.reduce((sum, student) => sum + student.attendance, 0) / students.length),
    topPerformer: students.sort((a, b) => b.performance - a.performance)[0],
    mostImproved: students.sort((a, b) => b.analytics.improvement - a.analytics.improvement)[0],
    activeStudents: students.filter(s => s.lastActive.includes('saat') || s.lastActive.includes('dakika')).length,
    totalStreak: students.reduce((sum, student) => sum + student.streak, 0)
  };

  // Ders bazlı analiz
  const courseAnalytics = [
    {
      name: 'Matematik',
      icon: <Calculator className="w-5 h-5" />,
      averageScore: 76,
      completionRate: 75,
      topStudent: 'Ayşe Demir',
      weakTopics: ['Geometri', 'Problemler'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      improvement: 8,
      totalStudents: 4,
      activeStudents: 3
    },
    {
      name: 'Türkçe',
      icon: <Book className="w-5 h-5" />,
      averageScore: 82,
      completionRate: 88,
      topStudent: 'Ayşe Demir',
      weakTopics: ['Yazım Kuralları', 'Noktalama'],
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      improvement: 12,
      totalStudents: 4,
      activeStudents: 4
    },
    {
      name: 'Fen Bilimleri',
      icon: <Beaker className="w-5 h-5" />,
      averageScore: 74,
      completionRate: 70,
      topStudent: 'Ayşe Demir',
      weakTopics: ['Fizik', 'Kimya'],
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      improvement: 15,
      totalStudents: 4,
      activeStudents: 2
    },
    {
      name: 'Sosyal Bilgiler',
      icon: <Globe className="w-5 h-5" />,
      averageScore: 77,
      completionRate: 82,
      topStudent: 'Ahmet Yılmaz',
      weakTopics: ['Tarih', 'Coğrafya'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      improvement: 10,
      totalStudents: 4,
      activeStudents: 3
    }
  ];

  // Performans grafiği verileri
  const performanceData = [
    { month: 'Oca', mathematics: 65, turkish: 70, science: 62, social: 68 },
    { month: 'Şub', mathematics: 68, turkish: 72, science: 65, social: 70 },
    { month: 'Mar', mathematics: 72, turkish: 75, science: 68, social: 72 },
    { month: 'Nis', mathematics: 75, turkish: 78, science: 72, social: 75 },
    { month: 'May', mathematics: 78, turkish: 82, science: 74, social: 77 },
    { month: 'Haz', mathematics: 76, turkish: 82, science: 74, social: 77 }
  ];

  // Öğrenci performans karşılaştırması için veri
  const studentComparisonData = students.map(student => ({
    name: student.name,
    mathematics: student.courses.find(c => c.name === 'Matematik')?.performance || 0,
    turkish: student.courses.find(c => c.name === 'Türkçe')?.performance || 0,
    science: student.courses.find(c => c.name === 'Fen Bilimleri')?.performance || 0,
    social: student.courses.find(c => c.name === 'Sosyal Bilgiler')?.performance || 0,
    overall: student.performance
  }));

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return 'text-green-600 bg-green-100';
    if (performance >= 80) return 'text-blue-600 bg-blue-100';
    if (performance >= 70) return 'text-yellow-600 bg-yellow-100';
    if (performance >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressColor = (progress) => {
    if (progress > 0) return 'text-green-600';
    if (progress < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getProgressIcon = (progress) => {
    if (progress > 0) return <ArrowUp className="w-4 h-4" />;
    if (progress < 0) return <ArrowDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  // Filtreleme fonksiyonu
  const filterStudents = (students) => {
    let filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (selectedFilter) {
      case 'active':
        filtered = filtered.filter(s => s.lastActive.includes('saat') || s.lastActive.includes('dakika'));
        break;
      case 'high':
        filtered = filtered.filter(s => s.performance >= 80);
        break;
      case 'low':
        filtered = filtered.filter(s => s.performance < 70);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredStudents = filterStudents(students);

  // PDF ve Rapor Fonksiyonları - DÜZELTİLMİŞ VERSİYON
  const generateClassReport = () => {
    const content = `
      <div class="stats-grid">
        <div class="stat-card">
          <div>Toplam Öğrenci</div>
          <div class="stat-value">${classStats.totalStudents}</div>
        </div>
        <div class="stat-card">
          <div>Ortalama Başarı</div>
          <div class="stat-value">${classStats.averagePerformance}%</div>
        </div>
        <div class="stat-card">
          <div>Ortalama Katılım</div>
          <div class="stat-value">${classStats.averageAttendance}%</div>
        </div>
      </div>

      <h2>Öğrenci Performansları</h2>
      <table class="student-table">
        <thead>
          <tr>
            <th>Öğrenci</th>
            <th>Başarı (%)</th>
            <th>Gelişim</th>
            <th>Katılım</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          ${students.map(student => `
            <tr>
              <td>${student.name}</td>
              <td>${student.performance}%</td>
              <td>${student.analytics.improvement > 0 ? '+' : ''}${student.analytics.improvement}%</td>
              <td>${student.attendance}%</td>
              <td>
                <span class="performance-badge" style="background: ${
                  student.performance >= 90 ? '#10b981' : 
                  student.performance >= 80 ? '#3b82f6' : 
                  student.performance >= 70 ? '#f59e0b' : '#ef4444'
                }; color: white;">
                  ${student.performance >= 90 ? 'Mükemmel' : 
                   student.performance >= 80 ? 'İyi' : 
                   student.performance >= 70 ? 'Orta' : 'Gelişim Gerekli'}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Ders Bazlı Performans</h2>
      <table class="student-table">
        <thead>
          <tr>
            <th>Ders</th>
            <th>Ortalama Başarı</th>
            <th>Tamamlama Oranı</th>
            <th>En Başarılı Öğrenci</th>
          </tr>
        </thead>
        <tbody>
          ${courseAnalytics.map(course => `
            <tr>
              <td>${course.name}</td>
              <td>${course.averageScore}%</td>
              <td>${course.completionRate}%</td>
              <td>${course.topStudent}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    generatePDF(content, 'Sınıf Genel Raporu');
  };

  const generateDetailedReport = () => {
    const content = `
      <h2>Detaylı Sınıf Analizi</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div>Toplam Çözülen Soru</div>
          <div class="stat-value">${classStats.totalQuestions.toLocaleString()}</div>
        </div>
        <div class="stat-card">
          <div>Aktif Öğrenci</div>
          <div class="stat-value">${classStats.activeStudents}</div>
        </div>
        <div class="stat-card">
          <div>Toplam Streak</div>
          <div class="stat-value">${classStats.totalStreak}</div>
        </div>
      </div>

      <h2>En İyi Performanslar</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
          <h3 style="color: #f97316; margin-top: 0;">En Yüksek Başarı</h3>
          <p><strong>${classStats.topPerformer.name}</strong></p>
          <p>Başarı: ${classStats.topPerformer.performance}%</p>
        </div>
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
          <h3 style="color: #10b981; margin-top: 0;">En Çok Gelişim</h3>
          <p><strong>${classStats.mostImproved.name}</strong></p>
          <p>Gelişim: +${classStats.mostImproved.analytics.improvement}%</p>
        </div>
      </div>

      <h2>Aylık Performans Trendi</h2>
      <table class="student-table">
        <thead>
          <tr>
            <th>Ay</th>
            <th>Matematik</th>
            <th>Türkçe</th>
            <th>Fen</th>
            <th>Sosyal</th>
            <th>Ortalama</th>
          </tr>
        </thead>
        <tbody>
          ${performanceData.map(data => `
            <tr>
              <td>${data.month}</td>
              <td>${data.mathematics}%</td>
              <td>${data.turkish}%</td>
              <td>${data.science}%</td>
              <td>${data.social}%</td>
              <td><strong>${Math.round((data.mathematics + data.turkish + data.science + data.social) / 4)}%</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    generatePDF(content, 'Detaylı Analiz Raporu');
  };

  // DÜZELTİLMİŞ ÖĞRENCİ PERFORMANS RAPORU
  const generateStudentReport = (student = null) => {
    const targetStudent = student || selectedStudent;
    
    if (!targetStudent) {
      alert('Lütfen önce bir öğrenci seçin!');
      return;
    }

    const content = `
      <div style="text-align: center; margin-bottom: 30px;">
        <h2>${targetStudent.name} - Öğrenci Performans Raporu</h2>
        <p>${targetStudent.grade} | ${new Date().toLocaleDateString('tr-TR')}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div>Genel Başarı</div>
          <div class="stat-value">${targetStudent.performance}%</div>
        </div>
        <div class="stat-card">
          <div>Sınıf Sıralaması</div>
          <div class="stat-value">#${targetStudent.analytics.rank}</div>
        </div>
        <div class="stat-card">
          <div>Katılım Oranı</div>
          <div class="stat-value">${targetStudent.attendance}%</div>
        </div>
      </div>

      <h2>Ders Performansları</h2>
      <table class="student-table">
        <thead>
          <tr>
            <th>Ders</th>
            <th>Başarı (%)</th>
            <th>İlerleme</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          ${targetStudent.courses.map(course => `
            <tr>
              <td>${course.name}</td>
              <td>${course.performance}%</td>
              <td>${course.progress}%</td>
              <td>
                <span class="performance-badge" style="background: ${
                  course.performance >= 90 ? '#10b981' : 
                  course.performance >= 80 ? '#3b82f6' : 
                  course.performance >= 70 ? '#f59e0b' : '#ef4444'
                }; color: white;">
                  ${course.performance >= 90 ? 'Mükemmel' : 
                   course.performance >= 80 ? 'İyi' : 
                   course.performance >= 70 ? 'Orta' : 'Gelişim Gerekli'}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Çalışma İstatistikleri</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
          <h3 style="color: #f97316; margin-top: 0;">Haftalık Hedef</h3>
          <p>Tamamlanan: ${targetStudent.studyPlan.completedThisWeek} dk</p>
          <p>Hedef: ${targetStudent.studyPlan.weeklyTarget} dk</p>
          <p>Tamamlama: ${Math.round((targetStudent.studyPlan.completedThisWeek / targetStudent.studyPlan.weeklyTarget) * 100)}%</p>
        </div>
        <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
          <h3 style="color: #10b981; margin-top: 0;">Soru Çözümü</h3>
          <p>Toplam: ${targetStudent.analytics.totalQuestions}</p>
          <p>Doğru: ${targetStudent.analytics.correctAnswers}</p>
          <p>Doğruluk: ${Math.round((targetStudent.analytics.correctAnswers / targetStudent.analytics.totalQuestions) * 100)}%</p>
        </div>
      </div>

      <h2>Ders İlerleme Durumu</h2>
      ${targetStudent.courses.map(course => `
        <div style="margin: 15px 0;">
          <div style="display: flex; justify-content: between; margin-bottom: 5px;">
            <span style="font-weight: bold;">${course.name}</span>
            <span>${course.progress}%</span>
          </div>
          <div class="course-progress">
            <div class="course-progress-bar" style="width: ${course.progress}%; background: ${
              course.performance >= 90 ? '#10b981' : 
              course.performance >= 80 ? '#3b82f6' : 
              course.performance >= 70 ? '#f59e0b' : '#ef4444'
            };"></div>
          </div>
        </div>
      `).join('')}

      <h2>İletişim Bilgileri</h2>
      <div style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Telefon:</strong> ${targetStudent.contact.phone}</p>
        <p><strong>E-posta:</strong> ${targetStudent.contact.email}</p>
        <p><strong>Adres:</strong> ${targetStudent.contact.address}</p>
      </div>
    `;
    
    generatePDF(content, `${targetStudent.name} - Öğrenci Performans Raporu`);
  };

  const generateCourseReport = () => {
    const content = `
      <h2>Ders Bazlı Detaylı Rapor</h2>
      
      ${courseAnalytics.map(course => `
        <div style="border: 1px solid #ddd; padding: 20px; margin: 15px 0; border-radius: 8px;">
          <h3 style="color: #f97316; margin-top: 0;">${course.name}</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div>
              <p><strong>Ortalama Başarı:</strong> ${course.averageScore}%</p>
              <p><strong>Tamamlama Oranı:</strong> ${course.completionRate}%</p>
              <p><strong>Gelişim:</strong> +${course.improvement}%</p>
            </div>
            <div>
              <p><strong>En Başarılı:</strong> ${course.topStudent}</p>
              <p><strong>Zayıf Konular:</strong> ${course.weakTopics.join(', ')}</p>
              <p><strong>Aktif Öğrenci:</strong> ${course.activeStudents}/${course.totalStudents}</p>
            </div>
          </div>
        </div>
      `).join('')}

      <h2>Ders Karşılaştırması</h2>
      <table class="student-table">
        <thead>
          <tr>
            <th>Ders</th>
            <th>Ortalama</th>
            <th>Tamamlama</th>
            <th>Gelişim</th>
            <th>Performans</th>
          </tr>
        </thead>
        <tbody>
          ${courseAnalytics.map(course => `
            <tr>
              <td>${course.name}</td>
              <td>${course.averageScore}%</td>
              <td>${course.completionRate}%</td>
              <td>+${course.improvement}%</td>
              <td>
                <div style="background: #e5e7eb; height: 10px; border-radius: 5px;">
                  <div style="background: ${
                    course.averageScore >= 90 ? '#10b981' : 
                    course.averageScore >= 80 ? '#3b82f6' : 
                    course.averageScore >= 70 ? '#f59e0b' : '#ef4444'
                  }; height: 100%; width: ${course.averageScore}%; border-radius: 5px;"></div>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    generatePDF(content, 'Ders Bazlı Rapor');
  };

  // Eylem fonksiyonları - DÜZELTİLMİŞ
  const handleExport = (type) => {
    setExportMenuOpen(false);
    
    switch (type) {
      case 'pdf':
        generateClassReport();
        break;
      case 'excel':
        alert('Excel raporu indiriliyor...');
        break;
      case 'print':
        window.print();
        break;
      case 'share':
        alert('Rapor paylaşım ekranı açılıyor...');
        break;
      default:
        break;
    }
  };

  const handleBulkMessage = () => {
    alert('Toplu mesaj gönderim ekranı açılıyor...');
  };

  const handleBulkEmail = () => {
    alert('Toplu email gönderim ekranı açılıyor...');
  };

  const handleClassReport = () => {
    generateClassReport();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleMessageStudent = (student) => {
    alert(`${student.name} öğrencisine mesaj gönderiliyor...`);
  };

  const handleEmailStudent = (student) => {
    alert(`${student.name} öğrencisine email gönderiliyor...`);
  };

  const handleCreateReport = (student) => {
    generateStudentReport(student);
  };

  // Öğrenci seçimini kontrol eden fonksiyon
  const handleStudentReportClick = () => {
    if (!selectedStudent) {
      alert('Lütfen önce bir öğrenci seçin! Öğrenci listesinden bir öğrenciye tıklayın.');
      return;
    }
    generateStudentReport(selectedStudent);
  };

  // Chart render fonksiyonları
  const renderPerformanceChart = () => {
    if (chartType === 'bar') {
      return (
        <div className="space-y-4">
          {performanceData.map((data, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{data.month}</span>
                <span className="text-gray-600">Ortalama: {Math.round((data.mathematics + data.turkish + data.science + data.social) / 4)}%</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: `${data.mathematics}%` }}></div>
                <div className="h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full" style={{ width: `${data.turkish}%` }}></div>
                <div className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: `${data.science}%` }}></div>
                <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: `${data.social}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Pie chart için basit bir gösterim
      const totalScores = performanceData.reduce((acc, curr) => ({
        mathematics: acc.mathematics + curr.mathematics,
        turkish: acc.turkish + curr.turkish,
        science: acc.science + curr.science,
        social: acc.social + curr.social
      }), { mathematics: 0, turkish: 0, science: 0, social: 0 });

      const total = Object.values(totalScores).reduce((a, b) => a + b, 0);
      
      return (
        <div className="flex flex-col items-center justify-center h-48">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500" 
                 style={{ clipPath: `conic-gradient(transparent 0%, blue 0% ${(totalScores.mathematics/total)*100}%, transparent ${(totalScores.mathematics/total)*100}%)` }}></div>
            <div className="absolute inset-0 rounded-full border-4 border-red-500" 
                 style={{ clipPath: `conic-gradient(transparent ${(totalScores.mathematics/total)*100}%, red ${(totalScores.mathematics/total)*100}% ${(totalScores.mathematics/total + totalScores.turkish/total)*100}%, transparent ${(totalScores.mathematics/total + totalScores.turkish/total)*100}%)` }}></div>
            <div className="absolute inset-0 rounded-full border-4 border-green-500" 
                 style={{ clipPath: `conic-gradient(transparent ${(totalScores.mathematics/total + totalScores.turkish/total)*100}%, green ${(totalScores.mathematics/total + totalScores.turkish/total)*100}% ${(totalScores.mathematics/total + totalScores.turkish/total + totalScores.science/total)*100}%, transparent ${(totalScores.mathematics/total + totalScores.turkish/total + totalScores.science/total)*100}%)` }}></div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-500" 
                 style={{ clipPath: `conic-gradient(transparent ${(totalScores.mathematics/total + totalScores.turkish/total + totalScores.science/total)*100}%, purple ${(totalScores.mathematics/total + totalScores.turkish/total + totalScores.science/total)*100}% 100%, transparent 100%)` }}></div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 mr-1"></div>
              <span>Matematik</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 mr-1"></div>
              <span>Türkçe</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 mr-1"></div>
              <span>Fen</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 mr-1"></div>
              <span>Sosyal</span>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderStudentComparisonChart = () => {
    if (courseChartType === 'bar') {
      return (
        <div className="space-y-3">
          {studentComparisonData.map((student, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{student.name}</span>
                <span className="text-gray-600">Ortalama: {student.overall}%</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: `${student.mathematics}%` }}></div>
                <div className="h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full" style={{ width: `${student.turkish}%` }}></div>
                <div className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: `${student.science}%` }}></div>
                <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" style={{ width: `${student.social}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Öğrenci karşılaştırması için pie chart
      return (
        <div className="flex flex-col items-center justify-center h-48">
          <div className="relative w-32 h-32 mb-4">
            {students.map((student, index) => {
              const percentage = (student.performance / students.reduce((sum, s) => sum + s.performance, 0)) * 100;
              const start = students.slice(0, index).reduce((sum, s) => sum + (s.performance / students.reduce((total, st) => total + st.performance, 0)) * 100, 0);
              const colors = ['from-blue-500 to-blue-600', 'from-red-500 to-red-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600'];
              
              return (
                <div 
                  key={index}
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    clipPath: `conic-gradient(transparent ${start}%, transparent ${start}% ${start + percentage}%, transparent ${start + percentage}%)`,
                    background: `conic-gradient(${colors[index]} ${start}%, ${colors[index]} ${start}% ${start + percentage}%, transparent ${start + percentage}%)`
                  }}
                ></div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {students.map((student, index) => {
              const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500'];
              return (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 ${colors[index]} mr-1`}></div>
                  <span>{student.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  // Floating background elements
  const floatingElements = [
    { id: 1, size: 'w-16 h-16', position: 'top-20 left-20', delay: '0s', color: 'from-orange-200 to-orange-300' },
    { id: 2, size: 'w-12 h-12', position: 'top-40 right-32', delay: '2s', color: 'from-blue-200 to-blue-300' },
    { id: 3, size: 'w-20 h-20', position: 'bottom-32 left-24', delay: '1s', color: 'from-purple-200 to-purple-300' },
    { id: 4, size: 'w-14 h-14', position: 'bottom-20 right-20', delay: '3s', color: 'from-green-200 to-green-300' },
  ];

  const StudentDetailModal = ({ student, onClose }) => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-white/30">
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Öğrenci Detayları</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol Panel - Öğrenci Bilgileri */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 text-center mb-6">
                <div className="text-6xl mb-4">{student.avatar}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{student.name}</h4>
                <p className="text-gray-600 mb-3">{student.grade}</p>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getPerformanceColor(student.performance)}`}>
                  <Star className="w-4 h-4 mr-1" />
                  {student.performance}% Başarı
                </div>
              </div>

              {/* İletişim Bilgileri */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-sm">{student.contact.phone}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-sm">{student.contact.email}</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-500 mr-3" />
                  <span className="text-sm">{student.contact.address}</span>
                </div>
              </div>

              {/* Hızlı İstatistikler */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 text-center border">
                  <div className="text-2xl font-bold text-orange-600">{student.streak}</div>
                  <div className="text-gray-600 text-sm">Günlük Streak</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center border">
                  <div className="text-2xl font-bold text-green-600">#{student.analytics.rank}</div>
                  <div className="text-gray-600 text-sm">Sınıf Sırası</div>
                </div>
              </div>
            </div>

            {/* Sağ Panel - Detaylı Analizler */}
            <div className="lg:col-span-2">
              {/* Üst İstatistikler */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{student.studyPlan.completedThisWeek}</div>
                  <div className="text-gray-600 text-sm">Bu Hafta</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{student.attendance}%</div>
                  <div className="text-gray-600 text-sm">Katılım</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{student.analytics.totalQuestions}</div>
                  <div className="text-gray-600 text-sm">Toplam Soru</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">%{Math.round((student.analytics.correctAnswers/student.analytics.totalQuestions)*100)}</div>
                  <div className="text-gray-600 text-sm">Doğruluk</div>
                </div>
              </div>

              {/* Haftalık Aktivite Grafiği */}
              <div className="bg-white rounded-xl p-6 mb-6 border">
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-orange-500" />
                  Haftalık Aktivite
                </h5>
                <div className="h-32 flex items-end space-x-2">
                  {student.analytics.weeklyActivity.map((activity, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-orange-400 to-orange-500 rounded-t transition-all duration-500"
                        style={{ height: `${activity}%` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2">
                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][index]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ders Performansları */}
              <div className="bg-white rounded-xl p-6 border">
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                  Ders Performansları
                </h5>
                <div className="space-y-4">
                  {student.courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${course.color} flex items-center justify-center text-white text-sm font-bold`}>
                          {course.name[0]}
                        </div>
                        <span className="font-medium">{course.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold text-lg">{course.performance}%</div>
                          <div className="text-xs text-gray-500">Başarı</div>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full bg-gradient-to-r ${course.color} transition-all duration-300`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 w-12 text-right">{course.progress}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Alt Eylem Butonları */}
          <div className="flex flex-wrap justify-end gap-3 mt-8 pt-6 border-t">
            <button 
              onClick={() => handleMessageStudent(student)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Mesaj Gönder</span>
            </button>
            <button 
              onClick={() => handleEmailStudent(student)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email Gönder</span>
            </button>
            <button 
              onClick={() => handleCreateReport(student)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Rapor Oluştur</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ExportMenu = () => (
    <div 
      ref={exportMenuRef}
      className="absolute top-12 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 min-w-48 z-50"
    >
      <button 
        onClick={() => handleExport('pdf')}
        className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <FileText className="w-4 h-4 text-red-500" />
        <span>PDF Olarak İndir</span>
      </button>
      <button 
        onClick={() => handleExport('excel')}
        className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <FileDown className="w-4 h-4 text-green-500" />
        <span>Excel Olarak İndir</span>
      </button>
      <button 
        onClick={() => handleExport('print')}
        className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Printer className="w-4 h-4 text-gray-500" />
        <span>Yazdır</span>
      </button>
      <button 
        onClick={() => handleExport('share')}
        className="flex items-center space-x-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Share2 className="w-4 h-4 text-blue-500" />
        <span>Paylaş</span>
      </button>
    </div>
  );

  const ReportTemplatesModal = () => (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/30">
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Rapor Şablonları</h3>
            <button onClick={() => setExportMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => (
              <div 
                key={template.id}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  switch(template.id) {
                    case 1: 
                      generateClassReport(); 
                      break;
                    case 2: 
                      generateDetailedReport(); 
                      break;
                    case 3: 
                      handleStudentReportClick();
                      break;
                    case 4: 
                      generateCourseReport(); 
                      break;
                  }
                  setExportMenuOpen(false);
                }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    {template.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  {template.id === 1 && 'Sınıf genel performans raporu ve istatistikler'}
                  {template.id === 2 && 'Detaylı analizler ve trend grafikleri'}
                  {template.id === 3 && 'Seçili öğrenci için kişisel rapor'}
                  {template.id === 4 && 'Ders bazlı performans analizleri'}
                </p>
                {template.id === 3 && !selectedStudent && (
                  <p className="text-orange-600 text-xs mt-2">⚠️ Önce bir öğrenci seçin</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${element.size} ${element.position} bg-gradient-to-br ${element.color} rounded-full opacity-20 animate-pulse`}
          style={{
            animationDelay: element.delay,
            animationDuration: '4s'
          }}
        ></div>
      ))}

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/10 to-orange-600/10 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-4 transition-all duration-1000 ${
                animatedElements ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
              }`}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                      Öğretmen Paneli
                    </span>
                  </h1>
                  <p className="text-gray-600">8. Sınıf - Matematik Öğretmeni</p>
                </div>
              </div>
              <div className={`flex items-center space-x-3 transition-all duration-1000 delay-200 ${
                animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setExportMenuOpen(!exportMenuOpen)}
                    className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:block">Rapor Oluştur</span>
                  </button>
                  {exportMenuOpen && <ExportMenu />}
                </div>
                <button 
                  onClick={generateClassReport}
                  className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <FileUp className="w-5 h-5" />
                  <span className="hidden sm:block">Hızlı PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Seçili Öğrenci Bilgisi */}
          {selectedStudent && (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 mb-6 border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedStudent.avatar}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Seçili Öğrenci: {selectedStudent.name}</h3>
                    <p className="text-gray-600">Başarı: {selectedStudent.performance}% | Sıra: #{selectedStudent.analytics.rank}</p>
                  </div>
                </div>
                <button 
                  onClick={() => generateStudentReport(selectedStudent)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Öğrenci Raporu Oluştur</span>
                </button>
              </div>
            </div>
          )}

          {/* Genel İstatistikler */}
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 transition-all duration-1000 delay-300 ${
            animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="p-4 lg:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{classStats.totalStudents}</div>
                  <div className="text-gray-600 text-sm font-medium">Toplam Öğrenci</div>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="p-4 lg:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{classStats.averagePerformance}%</div>
                  <div className="text-gray-600 text-sm font-medium">Ortalama Başarı</div>
                </div>
                <BarChart3 className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="p-4 lg:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{classStats.totalQuestions.toLocaleString()}</div>
                  <div className="text-gray-600 text-sm font-medium">Toplam Çözüm</div>
                </div>
                <BookOpen className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            <div className="p-4 lg:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{classStats.averageAttendance}%</div>
                  <div className="text-gray-600 text-sm font-medium">Ortalama Katılım</div>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="p-4 lg:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{classStats.activeStudents}</div>
                  <div className="text-gray-600 text-sm font-medium">Aktif Öğrenci</div>
                </div>
                <Activity className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="p-4 lg:p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{classStats.totalStreak}</div>
                  <div className="text-gray-600 text-sm font-medium">Toplam Streak</div>
                </div>
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Rapor Şablonları Hızlı Erişim */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ClipboardList className="w-6 h-6 mr-2 text-orange-500" />
              Hızlı Rapor Şablonları
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reportTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => {
                    switch(template.id) {
                      case 1: generateClassReport(); break;
                      case 2: generateDetailedReport(); break;
                      case 3: handleStudentReportClick(); break;
                      case 4: generateCourseReport(); break;
                    }
                  }}
                  className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:shadow-lg transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={template.id === 3 && !selectedStudent}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg text-white ${
                      template.id === 3 && !selectedStudent ? 'bg-gray-400' : 'bg-orange-500'
                    }`}>
                      {template.icon}
                    </div>
                    <span className="font-semibold text-gray-900">{template.name}</span>
                  </div>
                  {template.id === 3 && !selectedStudent && (
                    <p className="text-orange-600 text-xs mt-2">Öğrenci seçin</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Ana İçerik Alanı */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sol Sütun - Öğrenci Listesi */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                  <h2 className="text-xl font-bold text-gray-900">Öğrenci Listesi</h2>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Öğrenci ara..."
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select 
                      className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent z-10 relative bg-white"
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                      <option value="all">Tümü</option>
                      <option value="active">Aktif</option>
                      <option value="high">Yüksek Başarı</option>
                      <option value="low">Düşük Başarı</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div 
                      key={student.id}
                      className={`bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                        selectedStudent && selectedStudent.id === student.id ? 'ring-2 ring-orange-500' : ''
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{student.avatar}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-gray-600 text-sm">{student.grade}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg">{student.performance}%</span>
                              <div className={`flex items-center ${getProgressColor(student.analytics.improvement)}`}>
                                {getProgressIcon(student.analytics.improvement)}
                                <span className="text-sm">{student.analytics.improvement}%</span>
                              </div>
                            </div>
                            <div className="text-gray-500 text-sm">Son aktivite: {student.lastActive}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPerformanceColor(student.performance)}`}>
                            {student.performance >= 90 ? 'Mükemmel' : 
                             student.performance >= 80 ? 'İyi' : 
                             student.performance >= 70 ? 'Orta' : 'Gelişim Gerekli'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ders Analizleri */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Ders Bazlı Analiz</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setCourseChartType('bar')}
                      className={`p-2 rounded-lg ${courseChartType === 'bar' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCourseChartType('pie')}
                      className={`p-2 rounded-lg ${courseChartType === 'pie' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <PieChart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {courseChartType === 'bar' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseAnalytics.map((course, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${course.bgColor}`}>
                              {course.icon}
                            </div>
                            <span className="font-semibold">{course.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{course.averageScore}%</div>
                            <div className="text-green-600 text-sm">+{course.improvement}%</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tamamlama Oranı</span>
                            <span>{course.completionRate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                              style={{ width: `${course.completionRate}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            En başarılı: {course.topStudent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      {courseAnalytics.map((course, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200 text-center">
                          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${course.color} flex items-center justify-center text-white mb-2`}>
                            {course.icon}
                          </div>
                          <div className="font-semibold">{course.name}</div>
                          <div className="text-2xl font-bold">{course.averageScore}%</div>
                          <div className="text-green-600 text-sm">+{course.improvement}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Öğrenci Karşılaştırması */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Öğrenci Performans Karşılaştırması</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setChartType('bar')}
                      className={`p-2 rounded-lg ${chartType === 'bar' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setChartType('pie')}
                      className={`p-2 rounded-lg ${chartType === 'pie' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <PieChart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {renderStudentComparisonChart()}
              </div>
            </div>

            {/* Sağ Sütun - Detaylı Analizler */}
            <div className="space-y-8">
              {/* Performans Grafiği */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Sınıf Performansı</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setChartType('bar')}
                      className={`p-2 rounded-lg ${chartType === 'bar' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setChartType('pie')}
                      className={`p-2 rounded-lg ${chartType === 'pie' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                      <PieChart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {renderPerformanceChart()}
              </div>

              {/* En İyi Performanslar */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">En İyi Performanslar</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Crown className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">En Yüksek Başarı</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{classStats.topPerformer.name}</div>
                      <div className="text-yellow-600">{classStats.topPerformer.performance}%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">En Çok Gelişim</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{classStats.mostImproved.name}</div>
                      <div className="text-green-600">+{classStats.mostImproved.analytics.improvement}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hızlı Eylemler */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Hızlı Eylemler</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleBulkMessage}
                    className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Toplu Mesaj</span>
                  </button>
                  <button 
                    onClick={handleBulkEmail}
                    className="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Toplu Email</span>
                  </button>
                  <button 
                    onClick={handleClassReport}
                    className="p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Sınıf Raporu</span>
                  </button>
                  <button 
                    onClick={handlePrint}
                    className="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Yazdır</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Öğrenci Detay Modal */}
      {selectedStudent && (
        <StudentDetailModal 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}

      {/* Rapor Şablonları Modal */}
      {exportMenuOpen && <ReportTemplatesModal />}
    </div>
  );
}