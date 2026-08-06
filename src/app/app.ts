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
  protected readonly activeFilter = signal('All classes');
  protected readonly activeNav = signal('Overview');
  protected readonly activeTool = signal('Attendance');
  protected readonly className = signal('');

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
