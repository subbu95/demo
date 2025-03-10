import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild } from '@angular/core';

interface MenuItem {
  label: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
        "label": "Technology Landscape",
        "children": [
            {
                "label": "Computing Devices",
                "children": [
                    {
                        "label": "Personal Computing",
                        "children": [
                            {"label": "Laptops", "children": [
                                {"label": "Gaming Laptops"},
                                {"label": "Business Laptops"},
                                {"label": "Ultrabooks"},
                                {"label": "Convertible Laptops"}
                            ]},
                            {"label": "Desktops", "children": [
                                {"label": "Gaming Desktops"},
                                {"label": "Workstations"},
                                {"label": "All-in-One PCs"},
                                {"label": "Mini PCs"}
                            ]},
                            {"label": "Tablets", "children": [
                                {"label": "Professional Tablets"},
                                {"label": "Entertainment Tablets"},
                                {"label": "Kids Tablets"},
                                {"label": "Drawing Tablets"}
                            ]}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "label": "Mobile Ecosystem",
        "children": [
            {
                "label": "Smartphone Categories",
                "children": [
                    {
                        "label": "Operating Systems",
                        "children": [
                            {"label": "Android Variants", "children": [
                                {"label": "Stock Android"},
                                {"label": "One UI"},
                                {"label": "MIUI"},
                                {"label": "OxygenOS"}
                            ]},
                            {"label": "iOS Editions", "children": [
                                {"label": "iPhone Standard"},
                                {"label": "iPhone Pro"},
                                {"label": "iPhone Mini"}
                            ]}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "label": "Communication Platforms",
        "children": [
            {
                "label": "Messaging Services",
                "children": [
                    {
                        "label": "Instant Messaging",
                        "children": [
                            {"label": "Text-Based Platforms", "children": [
                                {"label": "WhatsApp"},
                                {"label": "Telegram"},
                                {"label": "Signal"},
                                {"label": "Facebook Messenger"}
                            ]},
                            {"label": "Video Chat Services", "children": [
                                {"label": "Zoom"},
                                {"label": "Skype"},
                                {"label": "Google Meet"},
                                {"label": "Microsoft Teams"}
                            ]}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "label": "Entertainment Realm",
        "children": [
            {
                "label": "Streaming Services",
                "children": [
                    {
                        "label": "Video Platforms",
                        "children": [
                            {"label": "Subscription Services", "children": [
                                {"label": "Netflix"},
                                {"label": "Amazon Prime Video"},
                                {"label": "Disney+"},
                                {"label": "Hulu"}
                            ]},
                            {"label": "User-Generated Content", "children": [
                                {"label": "YouTube"},
                                {"label": "Twitch"},
                                {"label": "TikTok"},
                                {"label": "Vimeo"}
                            ]}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "label": "Cloud Computing",
        "children": [
            {
                "label": "Storage Solutions",
                "children": [
                    {
                        "label": "Personal Cloud",
                        "children": [
                            {"label": "Free Tier Services", "children": [
                                {"label": "Google Drive"},
                                {"label": "Dropbox Basic"},
                                {"label": "iCloud Free"},
                                {"label": "OneDrive Basic"}
                            ]},
                            {"label": "Paid Storage", "children": [
                                {"label": "Google One"},
                                {"label": "Dropbox Professional"},
                                {"label": "iCloud+"},
                                {"label": "OneDrive Premium"}
                            ]}
                        ]
                    }
                ]
            }
        ]
    },
    {
        "label": "Smart Home Technology",
        "children": [
            {
                "label": "Home Automation",
                "children": [
                    {
                        "label": "Voice Assistants",
                        "children": [
                            {"label": "Major Platforms", "children": [
                                {"label": "Amazon Alexa"},
                                {"label": "Google Assistant"},
                                {"label": "Apple Siri"},
                                {"label": "Microsoft Cortana"}
                            ]},
                            {"label": "Smart Speaker Brands", "children": [
                                {"label": "Amazon Echo"},
                                {"label": "Google Nest"},
                                {"label": "Apple HomePod"},
                                {"label": "Sonos"},
                                {"label": "Amazon Echo"},
                                {"label": "Google Nest"},
                                {"label": "Apple HomePod"},
                                {"label": "Sonos"},
                                {"label": "Amazon Echo"},
                                {"label": "Google Nest"},
                                {"label": "Apple HomePod"},
                                {"label": "Sonos"},
                                {"label": "Amazon Echo"},
                                {"label": "Google Nest"},
                                {"label": "Apple HomePod"},
                                {"label": "Sonos"},
                                {"label": "Amazon Echo"},
                                {"label": "Google Nest"},
                                {"label": "Apple HomePod"},
                                {"label": "Sonos"},
                                {"label": "Amazon Echo"},
                                {"label": "Google Nest"},
                                {"label": "Apple HomePod"},
                                {"label": "Sonos"}
                            ]}
                        ]
                    }
                ]
            }
        ]
    }
];

  currentMenu: MenuItem[] = this.menuItems; // Active menu items
  menuStack: MenuItem[][] = []; // Stack to track previous menus
  isDropdownOpen: boolean = false; // Tracks if dropdown is open

  openMainMenu(): void {
    this.isDropdownOpen = true;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
    this.menuStack = [];
    this.currentMenu = this.menuItems;
  }

  openSubmenu(item: MenuItem): void {
    if (item.children) {
      this.menuStack.push(this.currentMenu);
      this.currentMenu = item.children;
    }
  }

  goBack(): void {
    if (this.menuStack.length > 0) {
      this.currentMenu = this.menuStack.pop()!;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeDropdown();
    }
  }
}
