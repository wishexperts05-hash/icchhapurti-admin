import {
  BarChart3,
  TrendingUp,
  Users,
  Star,
  Home,
  User,
  Settings,
  FileText,
  MessageSquare,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Activity,
  PieChart,
  LineChart,
  Target,
  Award,
  Clock,
  Plus,
  CreditCard,
  ChevronDown,
  BanknoteArrowUp,
  ChevronRight as ChevronRightIcon,
  DollarSign,
  DollarSignIcon,
} from "lucide-react";

export const AdminOperation = [
    {
        label: 'User Management',
        url: '',
        icon: Users,
        permissionTypes: ['access'],
        children: [
            {
                label: 'Customer',
                url: '/customers',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'User Management',
                icon: User
            },
            {
                label: 'PG/Hostel Owner',
                url: '/pg-hostel-owner',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'User Management',
                icon: Home
            },
            {
                label: 'Tiffin/Restaurant Provider',
                url: '/tiffin-restaurant-provider',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'User Management',
                icon: Star
            },
        ]
    },
    {
        label: 'Listing Management',
        url: '',
        permissionTypes: ['access'],
        icon: FileText,
        children: [
            {
                label: 'Feature&Facilities',
                url: '/feature-facilities',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Listing Management',
                icon: Award
            },
            {
                label: 'PG/Hostel Listing',
                url: '/pg-hostel-listing',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Listing Management',
                icon: Home
            },
            {
                label: 'Tiffin/Restaurant Listing',
                url: '/restaurant-listing',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Listing Management',
                icon: Star
            }
        ]
    },
    {
        label: 'Booking & Order',
        url: '',
        permissionTypes: ['access'],
        icon: Calendar,
        children: [
            {
                label: 'PG/Hostel Booking',
                url: '/pg-hostel-bookings',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Booking & Order',
                icon: Home
            },
            {
                label: 'Tiffin/Restaurant Orders',
                url: '/restaurant-orders',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Booking & Order',
                icon: Star
            }
        ]
    },
    {
        label: 'Payment & Wallet',
        url: '',
        permissionTypes: ['access'],
        icon: BarChart3,
        children: [
            {
                label: 'Payment Overview',
                url: '/payments-overview',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Payment & Wallet',
                icon: BarChart3
            },
            {
                label: 'Wallet Transactions',
                url: '/wallet-transactions',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Payment & Wallet',
                icon: Activity
            },
            {
                label: 'Deposit Transactions',
                url: '/deposit-transactions',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Payment & Wallet',
                icon: BanknoteArrowUp
            },
            {
                label: 'Deposit Refund Request',
                url: '/deposit-refund-requests',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Payment & Wallet',
                icon: CreditCard
            },
            {
                label: 'Payout History',
                url: '/payout-history',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Payment & Wallet',
                icon: Clock
            }
        ]
    },
    {
        label: 'Coupon',
        url: '/coupon',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: Star,
    },
    {
        label: 'Rating & Reviews',
        url: '/reviews',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: Star
    },
    {
        label: 'Report & Analytics',
        url: '/analytics',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: PieChart
    },
    {
        label: 'CMS',
        url: '',
        permissionTypes: ['access'],
        icon: Settings,
        children: [
            {
                label: 'Banner',
                url: '/cms/banner',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'CMS',
                icon: FileText
            },
            {
                label: 'Static Page',
                url: '/cms/static-page',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'CMS',
                icon: Settings
            },
            {
                label: 'Notification Management',
                url: '/cms/notification-management',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'CMS',
                icon: MessageSquare
            }
        ]
    },
    {
        label: 'Chat List',
        url: '/chats',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: MessageSquare
    },
    {
        label: 'Settings',
        url: '',
        permissionTypes: ['access'],
        icon: Settings,
        children: [
            {
                label: 'Commission',
                url: '/settings/commission',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Settings',
                icon: DollarSign
            },
            {
                label: 'Charges & Benefit',
                url: '/settings/cashback',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Settings',
                icon: DollarSignIcon
            }
        ]
    },
]