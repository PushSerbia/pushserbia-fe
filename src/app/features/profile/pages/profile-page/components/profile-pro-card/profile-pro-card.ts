import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-pro-card',
  imports: [],
  templateUrl: './profile-pro-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileProCard {
  membershipStatus = input<'free' | 'member' | 'angel'>('free');

  get statusLabel(): string {
    switch (this.membershipStatus()) {
      case 'member':
        return 'Member';
      case 'angel':
        return 'Angel';
      default:
        return 'Free';
    }
  }

  get badgeClass(): string {
    switch (this.membershipStatus()) {
      case 'angel':
        return 'bg-yellow-900 text-yellow-300';
      case 'member':
        return 'bg-primary-900 text-primary-300';
      default:
        return 'bg-neutral-800 text-neutral-400';
    }
  }

  get isSupporter(): boolean {
    return this.membershipStatus() !== 'free';
  }

  openMembership(): void {
    window.open('https://buymeacoffee.com/duxor/membership', '_blank', 'noopener,noreferrer');
  }
}
