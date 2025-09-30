import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, BookOpen, Target, TrendingUp, Star, Sparkles, Clock, Award, CheckCircle, BarChart3, Users, Plus, Minus, Zap, X, HelpCircle, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

// Guided Tour Component
function GuidedTour({ steps, isOpen, onClose, currentStep, onNext, onPrev, onSkip }) {
  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl border border-white/20 max-w-md w-full mx-auto"
        style={currentStepData.position}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900">{currentStepData.title}</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {currentStep + 1}/{steps.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6 leading-relaxed">
            {currentStepData.content}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={onSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Turu Atla
            </button>
            
            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={onPrev}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  Geri
                </button>
              )}
              
              <button
                onClick={onNext}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg"
              >
                {currentStep === steps.length - 1 ? 'Tamamlandı' : 'İleri'}
              </button>
            </div>
          </div>
        </div>

        {/* Indicator Arrow */}
        {currentStepData.arrow && (
          <div 
            className={`absolute w-4 h-4 bg-white transform rotate-45 ${currentStepData.arrow.position}`}
            style={currentStepData.arrow.offset}
          ></div>
        )}
      </div>
    </div>
  );
}

// Floating Help Button
function FloatingHelpButton({ onClick, isPulsing }) {
  return (
    <button
      onClick={onClick}
      className={`fixed z-40 bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-110 ${
        isPulsing ? 'animate-pulse ring-4 ring-orange-300' : ''
      }`}
      title="Yardım Turu"
    >
      <HelpCircle className="w-6 h-6" />
    </button>
  );
}

// Animated Step Indicator Component
function AnimatedStepIndicator({ currentStep, steps, onStepClick }) {
  return (
    <div className="flex items-center justify-center space-x-4 lg:space-x-8 mb-8 lg:mb-12">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.step;
        const isCurrent = currentStep === step.step;
        const isUpcoming = currentStep < step.step;

        return (
          <div key={step.step} className="flex items-center">
            <button
              onClick={() => onStepClick(step.step)}
              className={`flex flex-col items-center transition-all duration-500 ${
                isCompleted ? 'text-green-500' : 
                isCurrent ? 'text-orange-500 scale-110' : 
                'text-gray-400'
              }`}
            >
              {/* Animated Circle */}
              <div className={`relative mb-2 transition-all duration-500 ${
                isCompleted ? 'scale-110' : 
                isCurrent ? 'scale-125' : 
                'scale-100'
              }`}>
                {/* Background Pulse Effect for Current Step */}
                {isCurrent && (
                  <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20"></div>
                )}
                
                {/* Main Circle */}
                <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg' 
                    : isCurrent 
                    ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-xl ring-4 ring-orange-200' 
                    : 'bg-gray-200 text-gray-400 shadow-md'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8" />
                  ) : (
                    <step.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                  )}
                </div>

                {/* Step Number Badge */}
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isCurrent 
                    ? 'bg-orange-500 text-white animate-bounce' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step.step}
                </div>
              </div>

              {/* Step Title */}
              <span className={`text-sm lg:text-base font-medium transition-all duration-300 ${
                isCurrent ? 'font-bold' : 'font-medium'
              }`}>
                {step.title}
              </span>

              {/* Step Description */}
              <span className={`text-xs mt-1 transition-all duration-300 ${
                isCurrent ? 'text-orange-600 font-medium' : 'text-gray-500'
              }`}>
                {step.description}
              </span>
            </button>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className={`w-8 lg:w-16 h-1 mx-2 lg:mx-4 transition-all duration-500 ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-orange-500' 
                  : isCurrent 
                  ? 'bg-gradient-to-r from-orange-500 to-gray-300' 
                  : 'bg-gray-300'
              }`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Study Plan Tracker Component
function StudyPlanTracker({ course, book, dateRange, totalDays, onBack }) {
  const [dailyTarget, setDailyTarget] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);

  useEffect(() => {
    // Calculate daily target based on total questions and days
    const target = Math.ceil(book.totalQuestions / totalDays);
    setDailyTarget(target);
  }, [book, totalDays]);

  const getRemainingDays = () => {
    const today = new Date();
    const timeDiff = dateRange.end - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const tourSteps = [
    {
      title: "Plan Özeti",
      content: "Bu bölümde çalışma planınızın genel özetini görebilirsiniz. Toplam soru sayısı, günlük hedef ve kalan gün bilgileri burada yer alır.",
      position: { position: 'absolute', top: '200px', left: '50%', transform: 'translateX(-50%)' }
    },
    {
      title: "İlerleme Çubuğu",
      content: "Günlük hedef dağılımınızı bu çubukta takip edebilirsiniz. Her gün tamamladığınız sorular çubukta yeşil renkle gösterilecektir.",
      position: { position: 'absolute', top: '400px', left: '50%', transform: 'translateX(-50%)' }
    },
    {
      title: "Konu Listesi",
      content: "Tüm konuları ve her konu için planlanan soru sayılarını burada görebilirsiniz. İlerlemenizi konu bazlı takip edebilirsiniz.",
      position: { position: 'absolute', top: '200px', right: '20px' },
      arrow: { position: 'top-0 -right-2', offset: { marginTop: '-8px' } }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tour Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowTour(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Yardım Turu</span>
        </button>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Çalışma Planınız</h2>
                <p className="text-gray-600">{book.name} - Plan özeti</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-500">{totalDays} gün</div>
                <div className="text-gray-600 text-sm">Toplam süre</div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{book.totalQuestions}</div>
                    <div className="text-blue-700 text-sm font-medium">Toplam Soru</div>
                  </div>
                  <Target className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{dailyTarget}</div>
                    <div className="text-green-700 text-sm font-medium">Günlük Hedef</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{book.topics.length}</div>
                    <div className="text-orange-700 text-sm font-medium">Toplam Konu</div>
                  </div>
                  <BookOpen className="w-8 h-8 text-orange-500" />
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{getRemainingDays()}</div>
                    <div className="text-purple-700 text-sm font-medium">Kalan Gün</div>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Plan Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Plan Summary */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Plan Özeti</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{dateRange.start?.toLocaleDateString('tr-TR')}</div>
                    <div className="text-gray-600 text-sm">Başlangıç Tarihi</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{dateRange.end?.toLocaleDateString('tr-TR')}</div>
                    <div className="text-gray-600 text-sm">Bitiş Tarihi</div>
                  </div>
                </div>

                {/* Daily Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Günlük Hedef Dağılımı</span>
                    <span className="font-medium">{dailyTarget} soru/gün</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-300"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-center">
                  <Zap className="w-5 h-5 inline mr-2" />
                  Plan başarıyla oluşturuldu! İyi çalışmalar!
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Ders Bilgileri</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ders:</label>
                    <div className="p-3 bg-white rounded-lg border border-orange-200">
                      {course.name}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama:</label>
                    <div className="p-3 bg-white rounded-lg border border-orange-200">
                      {course.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Topic Progress */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Konu Listesi</h3>
                
                <div className="space-y-4">
                  {book.topics.map((topic, index) => (
                    <div key={topic} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{index + 1}. {topic}</span>
                        <span className="text-gray-600">{Math.ceil(book.totalQuestions / book.topics.length)} soru</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
                          style={{ width: '0%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Planlanan</span>
                        <span>0/{Math.ceil(book.totalQuestions / book.topics.length)} çözüldü</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
<div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
  <button
    onClick={onBack}
    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
  >
    Geri
  </button>

  
  <div className="flex items-center space-x-4">
    <div className="text-sm text-gray-600">
      Günlük hedef: {dailyTarget} soru
    </div>     
    
          <button
          onClick={() => {
          window.location.href = '/teacher';
          }}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-bold shadow-2xl hover:shadow-xl transform hover:scale-105 flex items-center space-x-3"
          >
          <CheckCircle className="w-6 h-6" />
          <span>Öğretmen Panel</span>
          </button>
  </div>
</div>    
        </div>
      </div>

      {/* Guided Tour */}
      <GuidedTour
        steps={tourSteps}
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        currentStep={currentTourStep}
        onNext={() => {
          if (currentTourStep < tourSteps.length - 1) {
            setCurrentTourStep(currentTourStep + 1);
          } else {
            setShowTour(false);
            setCurrentTourStep(0);
          }
        }}
        onPrev={() => currentTourStep > 0 && setCurrentTourStep(currentTourStep - 1)}
        onSkip={() => {
          setShowTour(false);
          setCurrentTourStep(0);
        }}
      />
    </div>
  );
}

// Main Study Planner Component
export default function StudyPlanner() {
  const [currentStep, setCurrentStep] = useState(1);
  const [animatedElements, setAnimatedElements] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({ start: null, end: null });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Tour State
  const [showMainTour, setShowMainTour] = useState(false);
  const [currentMainTourStep, setCurrentMainTourStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    setAnimatedElements(true);
    
    // Check if user has seen the tour before
    const tourSeen = localStorage.getItem('studyPlannerTourSeen');
    if (!tourSeen) {
      setTimeout(() => {
        setShowMainTour(true);
        localStorage.setItem('studyPlannerTourSeen', 'true');
      }, 2000);
    }
  }, []);

  // Step Definitions with Custom Descriptions
  const steps = [
    { 
      step: 1, 
      title: 'Tarih Seçimi', 
      description: 'Çalışma döneminizi belirleyin',
      icon: Calendar,
      actionText: 'Tarihleri Seç ve İlerle',
      nextButtonText: 'Tarihleri Onayla'
    },
    { 
      step: 2, 
      title: 'Ders Seçimi', 
      description: 'Hangi derse çalışacaksınız?',
      icon: BookOpen,
      actionText: 'Ders Seç ve Devam Et',
      nextButtonText: 'Dersi Seç'
    },
    { 
      step: 3, 
      title: 'Kitap Seçimi', 
      description: 'Kaynak kitabınızı seçin',
      icon: Target,
      actionText: 'Kitap Seç ve Planı Oluştur',
      nextButtonText: 'Kitabı Seç'
    },
    { 
      step: 4, 
      title: 'Plan Özeti', 
      description: 'Planınızı görüntüleyin',
      icon: TrendingUp,
      actionText: 'Planınız Hazır!',
      nextButtonText: 'Planı Görüntüle'
    }
  ];

  const currentStepData = steps.find(step => step.step === currentStep);

  // Calendar Helper Functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('tr-TR');
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isInRange = (date) => {
    if (!selectedDateRange.start || !selectedDateRange.end) return false;
    return date >= selectedDateRange.start && date <= selectedDateRange.end;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    
    if (!selectedDateRange.start || (selectedDateRange.start && selectedDateRange.end)) {
      // Start new selection
      setSelectedDateRange({ start: clickedDate, end: null });
    } else if (selectedDateRange.start && !selectedDateRange.end) {
      // Complete the range
      if (clickedDate >= selectedDateRange.start) {
        setSelectedDateRange({ ...selectedDateRange, end: clickedDate });
      } else {
        setSelectedDateRange({ start: clickedDate, end: selectedDateRange.start });
      }
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 lg:h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = isSameDay(date, today);
      const isSelected = isSameDay(date, selectedDateRange.start) || isSameDay(date, selectedDateRange.end);
      const isInDateRange = isInRange(date);
      const isPast = date < today && !isSameDay(date, today);

      days.push(
        <button
          key={day}
          onClick={() => !isPast && handleDateClick(day)}
          disabled={isPast}
          className={`
            h-10 lg:h-12 w-full rounded-lg lg:rounded-xl text-sm lg:text-base font-medium transition-all duration-200
            ${isPast 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'hover:scale-105 hover:shadow-md cursor-pointer'
            }
            ${isToday 
              ? 'ring-2 ring-orange-500 ring-offset-2' 
              : ''
            }
            ${isSelected 
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg' 
              : isInDateRange 
              ? 'bg-orange-100 text-orange-700' 
              : isPast 
              ? 'bg-gray-50' 
              : 'bg-white hover:bg-orange-50 text-gray-700'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const courses = [
    {
      id: 1,
      name: 'Matematik',
      description: 'Temel matematik konuları ve soru çözümleri',
      color: 'from-blue-500 to-blue-600',
      icon: '📐',
      totalBooks: 12,
      completedBooks: 8,
      totalQuestions: 2500,
      books: [
        {
          id: 1,
          name: 'Temel Matematik - 1',
          author: 'Prof. Dr. Ahmet Yılmaz',
          topics: ['Sayılar', 'Dört İşlem', 'Kesirler', 'Ondalık Sayılar'],
          totalQuestions: 450,
          difficulty: 'Kolay',
          estimatedDays: 15,
          completed: true
        },
        {
          id: 2,
          name: 'Cebir ve Fonksiyonlar',
          author: 'Dr. Mehmet Özkan',
          topics: ['Cebirsel İfadeler', 'Denklemler', 'Fonksiyonlar', 'Grafik'],
          totalQuestions: 380,
          difficulty: 'Orta',
          estimatedDays: 18,
          completed: false
        },
        {
          id: 3,
          name: 'Geometri Temelleri',
          author: 'Doç. Dr. Fatma Kaya',
          topics: ['Açılar', 'Üçgenler', 'Dörtgenler', 'Çember'],
          totalQuestions: 420,
          difficulty: 'Orta',
          estimatedDays: 20,
          completed: false
        }
      ]
    },
    {
      id: 2,
      name: 'Türkçe',
      description: 'Dil bilgisi, yazım kuralları ve metin analizi',
      color: 'from-red-500 to-red-600',
      icon: '📚',
      totalBooks: 10,
      completedBooks: 6,
      totalQuestions: 1800,
      books: [
        {
          id: 1,
          name: 'Dil Bilgisi Temelleri',
          author: 'Prof. Dr. Ayşe Demir',
          topics: ['Ses Bilgisi', 'Kelime Türleri', 'Cümle Ögeleri', 'Yazım Kuralları'],
          totalQuestions: 320,
          difficulty: 'Kolay',
          estimatedDays: 12,
          completed: true
        },
        {
          id: 2,
          name: 'Metin Anlama ve Yorumlama',
          author: 'Dr. Can Şahin',
          topics: ['Okuma Anlama', 'Paragraf', 'Metin Türleri', 'Anlam Bilgisi'],
          totalQuestions: 280,
          difficulty: 'Orta',
          estimatedDays: 16,
          completed: false
        }
      ]
    },
    {
      id: 3,
      name: 'Fen Bilimleri',
      description: 'Fizik, kimya ve biyoloji konuları',
      color: 'from-green-500 to-green-600',
      icon: '🔬',
      totalBooks: 15,
      completedBooks: 9,
      totalQuestions: 3200,
      books: [
        {
          id: 1,
          name: 'Fizik Temelleri',
          author: 'Prof. Dr. Okan Yıldız',
          topics: ['Hareket', 'Kuvvet', 'Enerji', 'Isı'],
          totalQuestions: 400,
          difficulty: 'Orta',
          estimatedDays: 22,
          completed: false
        },
        {
          id: 2,
          name: 'Kimya Giriş',
          author: 'Dr. Elif Çetin',
          topics: ['Atomun Yapısı', 'Periyodik Sistem', 'Bağlar', 'Reaksiyonlar'],
          totalQuestions: 350,
          difficulty: 'Zor',
          estimatedDays: 25,
          completed: false
        }
      ]
    },
    {
      id: 4,
      name: 'Sosyal Bilgiler',
      description: 'Tarih, coğrafya ve vatandaşlık bilgisi',
      color: 'from-purple-500 to-purple-600',
      icon: '🌍',
      totalBooks: 8,
      completedBooks: 4,
      totalQuestions: 1500,
      books: [
        {
          id: 1,
          name: 'Türkiye Tarihi',
          author: 'Prof. Dr. Kemal Atatürk',
          topics: ['Osmanlı Dönemi', 'Cumhuriyet Tarihi', 'İnkılaplar', 'Atatürk İlkeleri'],
          totalQuestions: 300,
          difficulty: 'Orta',
          estimatedDays: 14,
          completed: true
        },
        {
          id: 2,
          name: 'Coğrafya ve İklim',
          author: 'Dr. Zeynep Arslan',
          topics: ['Türkiye Coğrafyası', 'İklim Tipleri', 'Doğal Kaynaklar', 'Nüfus'],
          totalQuestions: 250,
          difficulty: 'Kolay',
          estimatedDays: 12,
          completed: false
        }
      ]
    }
  ];

  const floatingElements = [
    { id: 1, size: 'w-16 h-16', position: 'top-20 left-20', delay: '0s' },
    { id: 2, size: 'w-12 h-12', position: 'top-40 right-32', delay: '2s' },
    { id: 3, size: 'w-20 h-20', position: 'bottom-32 left-24', delay: '1s' },
    { id: 4, size: 'w-14 h-14', position: 'bottom-20 right-20', delay: '3s' },
  ];

  const getTotalDays = () => {
    if (selectedDateRange.start && selectedDateRange.end) {
      const diffTime = Math.abs(selectedDateRange.end - selectedDateRange.start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 0;
  };

  // Navigation handlers
  const handleStepClick = (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Main Tour Steps
  const mainTourSteps = [
    {
      title: "Hoş Geldiniz! 🎓",
      content: "Klavuz Çalışma Planlayıcısı'na hoş geldiniz! Bu kısa tur ile uygulamayı nasıl kullanacağınızı öğreneceksiniz.",
      position: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    },
    {
      title: "İlerleme Adımları",
      content: "Buradaki adımları takip ederek çalışma planınızı oluşturabilirsiniz: 1) Tarih seçin, 2) Ders seçin, 3) Kitap seçin, 4) Planınızı görün.",
      position: { position: 'absolute', top: '200px', left: '50%', transform: 'translateX(-50%)' }
    },
    {
      title: "Tarih Seçimi",
      content: "Bu takvimden çalışmaya başlayacağınız ve biteceğiniz tarihleri seçin. Geçmiş tarihler seçilemez.",
      position: { position: 'absolute', top: '400px', left: '50%', transform: 'translateX(-50%)' },
      arrow: { position: 'top-0 -right-2', offset: { marginTop: '-8px' } }
    },
    {
      title: "İpuçları Paneli",
      content: "Bu panelde planlama ile ilgili önemli ipuçlarını bulabilirsiniz. Optimal süreler ve başarı önerileri burada yer alır.",
      position: { position: 'absolute', top: '300px', right: '20px' },
      arrow: { position: 'top-0 -right-2', offset: { marginTop: '-8px' } }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className={`absolute ${element.size} ${element.position} bg-gradient-to-br from-orange-200 to-orange-300 rounded-full opacity-20 animate-pulse`}
          style={{
            animationDelay: element.delay,
            animationDuration: '4s'
          }}
        ></div>
      ))}

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-800/10 to-gray-900/10 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
      </div>

      <div className="relative z-10 min-h-screen p-4">
        {/* Header */}
        <div className={`text-center mb-8 lg:mb-12 transition-all duration-1000 ${
          animatedElements ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
        }`}>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Klavuz <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Çalışma Planlayıcısı</span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
            Hedeflerinize ulaşmak için kişiselleştirilmiş çalışma planınızı oluşturun
          </p>
        </div>

        {/* Animated Step Indicator */}
        <div className={`transition-all duration-1000 delay-200 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <AnimatedStepIndicator 
            currentStep={currentStep}
            steps={steps}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Current Step Content */}
        <div className={`transition-all duration-700 ${
          animatedElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>

          {/* Step 1: Date Range Selection */}
          {currentStep === 1 && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Left Panel - Calendar */}
                  <div className="lg:w-3/5 p-6 lg:p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Çalışma Tarih Aralığını Seçin</h2>
                      <p className="text-gray-600">Çalışma planınız için başlangıç ve bitiş tarihlerini belirleyin</p>
                    </div>

                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                      <button
                        onClick={() => navigateMonth(-1)}
                        className="p-2 hover:bg-orange-200 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-orange-600" />
                      </button>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {currentDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
                      </h3>
                      <button
                        onClick={() => navigateMonth(1)}
                        className="p-2 hover:bg-orange-200 rounded-lg transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-orange-600" />
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="mb-6">
                      {/* Week Days */}
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'].map(day => (
                          <div key={day} className="h-10 flex items-center justify-center text-gray-500 font-medium text-sm">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-2">
                        {renderCalendar()}
                      </div>
                    </div>

                    {/* Selected Range Display */}
                    {selectedDateRange.start && (
                      <div className="p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl border border-orange-200">
                        <h4 className="font-semibold text-gray-900 mb-2">Seçilen Tarih Aralığı:</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Başlangıç:</span>
                            <span className="font-medium text-orange-600">{formatDate(selectedDateRange.start)}</span>
                          </div>
                          {selectedDateRange.end && (
                            <>
                              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Bitiş:</span>
                                <span className="font-medium text-orange-600">{formatDate(selectedDateRange.end)}</span>
                              </div>
                              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Toplam:</span>
                                <span className="font-bold text-orange-600">{getTotalDays()} gün</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Panel - Info */}
                  <div className="lg:w-2/5 bg-gradient-to-br from-gray-50 to-white p-6 lg:p-8 flex flex-col justify-center relative overflow-hidden border-l border-gray-200">
                    <div className="relative z-10">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl lg:text-2xl font-bold text-gray-900">Planlama İpuçları</h3>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-orange-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {[
                          { 
                            icon: Clock, 
                            title: 'Optimal Süre', 
                            desc: '30-90 gün arası planlar en etkili sonuçları verir',
                            tip: 'Kısa vadeli hedefler motivasyonu artırır' 
                          },
                          { 
                            icon: Target, 
                            title: 'Gerçekçi Hedefler', 
                            desc: 'Günlük çalışma saatinizi düşünerek planlayın',
                            tip: 'Her gün 2-4 saat çalışma idealdir' 
                          },
                          { 
                            icon: Award, 
                            title: 'Tutarlılık', 
                            desc: 'Düzenli çalışma başarının anahtarıdır',
                            tip: 'Hafta sonu molalarını unutmayın' 
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex space-x-4 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                              <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-semibold text-lg group-hover:text-orange-600 transition-colors">{item.title}</h4>
                              <p className="text-gray-600 text-sm mb-1">{item.desc}</p>
                              <p className="text-orange-500 text-xs">{item.tip}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quick Stats */}
                      <div className="mt-8 p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl border border-orange-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-gray-900">85%</div>
                            <div className="text-orange-600 text-xs">Başarı Oranı</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-gray-900">45 gün</div>
                            <div className="text-orange-600 text-xs">Ortalama Plan</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {selectedDateRange.start && selectedDateRange.end ? (
                        <span className="text-green-600 font-medium">✓ Tarih aralığı seçildi</span>
                      ) : selectedDateRange.start ? (
                        <span className="text-orange-600 font-medium">Bitiş tarihini seçin</span>
                      ) : (
                        <span>Başlangıç tarihini seçin</span>
                      )}
                    </div>
                    <button
                      onClick={handleNextStep}
                      disabled={!selectedDateRange.start || !selectedDateRange.end}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        selectedDateRange.start && selectedDateRange.end
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {currentStepData.nextButtonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Course Selection */}
          {currentStep === 2 && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                <div className="p-6 lg:p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Ders Seçin</h2>
                    <p className="text-gray-600">Çalışmak istediğiniz dersi seçin</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                    {courses.map((course, index) => (
                      <div
                        key={course.id}
                        onClick={() => setSelectedCourse(course)}
                        className={`p-6 rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                          selectedCourse?.id === course.id
                            ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-white shadow-xl'
                            : 'bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white shadow-lg'
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="text-center mb-4">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                            {course.icon}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                          <p className="text-gray-600 text-sm">{course.description}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Kitaplar:</span>
                            <span className="font-semibold">{course.completedBooks}/{course.totalBooks}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${course.color}`}
                              style={{ width: `${(course.completedBooks / course.totalBooks) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Toplam Soru:</span>
                            <span className="font-semibold">{course.totalQuestions.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedCourse && (
                    <div className="p-6 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl border border-orange-200 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Seçilen Ders: {selectedCourse.name}</h4>
                      <p className="text-gray-600 text-sm">{selectedCourse.description}</p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleBackStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                    >
                      Geri
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!selectedCourse}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        selectedCourse
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {currentStepData.nextButtonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Book Selection */}
          {currentStep === 3 && selectedCourse && (
            <div className="max-w-7xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                <div className="p-6 lg:p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Kitap Seçin</h2>
                    <p className="text-gray-600">{selectedCourse.name} dersi için çalışmak istediğiniz kitabı seçin</p>
                    
                    {/* Selected Course Info */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedCourse.color} flex items-center justify-center text-white`}>
                          {selectedCourse.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{selectedCourse.name}</h4>
                          <p className="text-gray-600 text-sm">Toplam {selectedCourse.books.length} kitap mevcut</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {selectedCourse.books.map((book, index) => (
                      <div
                        key={book.id}
                        onClick={() => setSelectedBook(book)}
                        className={`p-6 rounded-xl lg:rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl relative ${
                          selectedBook?.id === book.id
                            ? 'ring-2 ring-orange-500 bg-gradient-to-br from-orange-50 to-white shadow-xl'
                            : 'bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white shadow-lg'
                        } ${book.completed ? 'opacity-75' : ''}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        {book.completed && (
                          <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}

                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{book.name}</h3>
                          <p className="text-gray-600 text-sm mb-1">Yazar: {book.author}</p>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            book.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                            book.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {book.difficulty}
                          </div>
                        </div>

                        <div className="space-y-4">
                          {/* Topics */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Konular:</h4>
                            <div className="flex flex-wrap gap-1">
                              {book.topics.map((topic, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="font-bold text-gray-900">{book.totalQuestions}</div>
                              <div className="text-gray-600 text-xs">Toplam Soru</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <div className="font-bold text-gray-900">
                                {selectedDateRange.start && selectedDateRange.end 
                                  ? Math.ceil(book.totalQuestions / getTotalDays())
                                  : '-'
                                }
                              </div>
                              <div className="text-gray-600 text-xs">Günlük Soru</div>
                            </div>
                          </div>

                          {book.completed && (
                            <div className="text-center p-2 bg-green-50 text-green-700 rounded-lg text-sm">
                              ✓ Tamamlandı
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedBook && (
                    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl border border-blue-200 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Seçilen Kitap: {selectedBook.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Toplam Soru: </span>
                          <span className="font-semibold">{selectedBook.totalQuestions}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Zorluk: </span>
                          <span className="font-semibold">{selectedBook.difficulty}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Günlük Hedef: </span>
                          <span className="font-bold text-orange-600">
                            {selectedDateRange.start && selectedDateRange.end 
                              ? Math.ceil(selectedBook.totalQuestions / getTotalDays())
                              : '-'
                            } soru
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleBackStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                    >
                      Geri
                    </button>
                    <button
                      onClick={handleNextStep}
                      disabled={!selectedBook}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        selectedBook
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {currentStepData.nextButtonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Study Plan Summary */}
          {currentStep === 4 && selectedCourse && selectedBook && selectedDateRange.start && selectedDateRange.end && (
            <StudyPlanTracker 
              course={selectedCourse}
              book={selectedBook}
              dateRange={selectedDateRange}
              totalDays={getTotalDays()}
              onBack={handleBackStep}
            />
          )}
        </div>
      </div>

      {/* Floating Help Button */}
      <FloatingHelpButton 
        onClick={() => setShowMainTour(true)} 
        isPulsing={!hasSeenTour}
      />

      {/* Main Guided Tour */}
      <GuidedTour
        steps={mainTourSteps}
        isOpen={showMainTour}
        onClose={() => {
          setShowMainTour(false);
          setHasSeenTour(true);
        }}
        currentStep={currentMainTourStep}
        onNext={() => {
          if (currentMainTourStep < mainTourSteps.length - 1) {
            setCurrentMainTourStep(currentMainTourStep + 1);
          } else {
            setShowMainTour(false);
            setCurrentMainTourStep(0);
            setHasSeenTour(true);
          }
        }}
        onPrev={() => currentMainTourStep > 0 && setCurrentMainTourStep(currentMainTourStep - 1)}
        onSkip={() => {
          setShowMainTour(false);
          setCurrentMainTourStep(0);
          setHasSeenTour(true);
        }}
      />
    </div>
  );
}