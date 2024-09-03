import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems = [
    { name: 'Home', icon: 'home' },
    { name: 'Notifications', icon: 'notifications' },
    { name: 'Shop', icon: 'shop' },
    { name: 'Conversation', icon: 'mail' },
    { name: 'Wallet', icon: 'account_balance_wallet' },
    { name: 'Subscription', icon: 'subscriptions' },
    { name: 'My Profile', icon: 'person' },
    { name: 'Settings', icon: 'settings' }
  ];
}
