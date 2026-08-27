import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type ClassItem = {
  title: string;
  subject: string;
  students: number;
  time: string;
  room: string;
  color: string;
  initials: string;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly sidebarOpen = signal(false);
  protected readonly showNewClass = signal(false);
  protected readonly showNotifications = signal(false);
  protected readonly showSemesterMenu = signal(false);
  protected readonly showUserMenu = signal(false);
  protected readonly currentSemester = signal('Fall semester 2024');
  protected readonly activeFilter = signal('All classes');
  protected readonly activeNav = signal('Overview');
  protected readonly activeTool = signal('Attendance');
  protected readonly enrollmentMode = signal<'single' | 'batch'>('single');
  protected readonly showEnrollment = signal(false);
  protected readonly showToolModal = signal(false);
  protected readonly className = signal('');
  protected readonly workflowValue = signal('');
  protected readonly workflowMessage = signal('');
  protected readonly studentFirstName = signal('');
  protected readonly studentLastName = signal('');
  protected readonly studentEmail = signal('');
  protected readonly studentPhone = signal('');
  protected readonly studentTelegram = signal('');
  protected readonly preferredContact = signal('Telegram');
  protected readonly attendanceSearch = signal('');
  protected readonly attendanceFilter = signal('All students');
  protected readonly bulkAttendance = signal('Present');
  protected readonly speakingStudent = signal('');
  protected readonly showEventModal = signal(false);
  protected readonly eventTitle = signal('');
  protected readonly eventDate = signal('2024-10-14');
  protected readonly eventTime = signal('10:00');
  protected readonly eventType = signal('Lesson');
  protected readonly calendarEvents = signal<{ title: string; date: string; time: string; type: string }[]>([]);
  protected readonly showWeekends = signal(false);

  protected readonly teacherTools = [
    { label: 'Attendance', icon: 'check', tone: 'mint' },
    { label: 'Score grade', icon: 'chart', tone: 'lavender' },
    { label: 'Enroll student', icon: 'user-plus', tone: 'coral' },
    { label: 'Create exam', icon: 'file', tone: 'yellow' },
    { label: 'Review leave', icon: 'calendar', tone: 'blue' },
    { label: 'Add note', icon: 'note', tone: 'pink' },
    { label: 'Send alert', icon: 'bell', tone: 'orange' },
    { label: 'Parent contact', icon: 'message', tone: 'green' }
  ];

  protected readonly students = [
    { name: 'Maya Chen', initials: 'MC', className: 'Product Design Studio', status: 'Present', score: 'A', tone: 'mint' },
    { name: 'Ethan Brooks', initials: 'EB', className: 'Modern Architecture', status: 'Late', score: 'B+', tone: 'lavender' },
    { name: 'Sofia Patel', initials: 'SP', className: 'Visual Storytelling', status: 'Absent', score: 'A−', tone: 'coral' }
  ];

  protected readonly classes: ClassItem[] = [
    { title: 'Product Design Studio', subject: 'Design & Creative', students: 24, time: 'Today, 10:00 AM', room: 'Studio 04', color: 'coral', initials: 'PD' },
    { title: 'Modern Architecture', subject: 'Architecture', students: 18, time: 'Today, 1:30 PM', room: 'Room 2A', color: 'mint', initials: 'MA' },
    { title: 'Visual Storytelling', subject: 'Communication', students: 32, time: 'Tomorrow, 9:00 AM', room: 'Lecture Hall', color: 'lavender', initials: 'VS' }
  ];

  protected setNav(label: string) {
    this.activeNav.set(label);
    this.sidebarOpen.set(false);
    this.showNotifications.set(false);
    this.showSemesterMenu.set(false);
    this.showUserMenu.set(false);
  }

  protected selectSemester(semester: string) {
    this.currentSemester.set(semester);
    this.showSemesterMenu.set(false);
  }

  protected openEventModal() {
    this.eventTitle.set('');
    this.eventDate.set('2024-10-14');
    this.eventTime.set('10:00');
    this.eventType.set('Lesson');
    this.showEventModal.set(true);
  }

  protected closeEventModal() {
    this.showEventModal.set(false);
  }

  protected addEvent() {
    if (!this.eventTitle().trim()) return;
    this.calendarEvents.update((events) => [...events, {
      title: this.eventTitle().trim(),
      date: this.eventDate(),
      time: this.eventTime(),
      type: this.eventType()
    }]);
    this.closeEventModal();
  }

  protected selectTool(label: string) {
    this.activeTool.set(label);
    if (label === 'Enroll student') {
      this.openEnrollment();
      return;
    }
    this.workflowValue.set('');
    this.workflowMessage.set('');
    this.showToolModal.set(true);
  }

  protected closeToolModal() {
    this.showToolModal.set(false);
  }

  protected attendanceStudents() {
    const query = this.attendanceSearch().trim().toLowerCase();
    return this.students.filter((student) => {
      const matchesSearch = !query || student.name.toLowerCase().includes(query);
      const matchesFilter = this.attendanceFilter() === 'All students' || student.status === this.attendanceFilter();
      return matchesSearch && matchesFilter;
    });
  }

  protected applyBulkAttendance() {
    this.students.forEach((student) => student.status = this.bulkAttendance());
  }

  protected speakStudentName(name: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    this.speakingStudent.set(name);
    utterance.onend = () => this.speakingStudent.set('');
    window.speechSynthesis.speak(utterance);
  }

  protected saveWorkflow() {
    this.showToolModal.set(false);
  }

  protected openEnrollment() {
    this.enrollmentMode.set('single');
    this.showEnrollment.set(true);
  }

  protected closeEnrollment() {
    this.showEnrollment.set(false);
  }

  protected enrollStudent() {
    const hasContact = this.studentEmail().trim() || this.studentPhone().trim() || this.studentTelegram().trim();
    if (this.studentFirstName().trim() && this.studentLastName().trim() && hasContact) this.closeEnrollment();
  }

  protected downloadTemplate() {
    const csv = 'first_name,last_name,email,phone,telegram,class,parent_contact\nMaya,Chen,,+85512345678,@mayachen,Product Design Studio,+85598765432';
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    link.download = 'class0-student-roster-template.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  protected openNewClass() {
    this.className.set('');
    this.showNewClass.set(true);
  }

  protected closeNewClass() {
    this.showNewClass.set(false);
  }

  protected addClass() {
    if (this.className().trim()) this.showNewClass.set(false);
  }
}
