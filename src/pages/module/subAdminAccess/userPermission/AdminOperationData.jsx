import { FiInfo } from "react-icons/fi";
import {
  adminRoleManagementIcon,
  appManagementIcon,
  blockedUserandStaffsIcon,
  blogManagementIcon,
  chatSupportSystemIcon,
  coinSettingIcon,
  commentandReviewIcon,
  commissionsettingsIcon,
  countryManagementIcon,
  dashboardIcon,
  helpAndSupportIcon,
  luckyDrawAnalysisIcon,
  luckyDrawManagementIcon,
  manageBannerIcon,
  manageReddemRequestIcon,
  offerManagementIcon,
  orderManagementIcon,
  otherSettingsIcon,
  privicyPolicyIcon,
  productManagementIcon,
  referandearnIcon,
  refferralTrackingIcon,
  reportandanalyticsIcon,
  reportsIcon,
  rewardManagementIcon,
  spinRewardManagementIcon,
  staffCommissionIcon,
  staffManagementIcon,
  staffPerformanceIcon,
  targetManagementIcon,
  termAndConditionsIcon,
  themecustomizationIcon,
  uploadVideoIcon,
  userCommissionIcon,
  userManagementIcon,
} from "../../../../assets/sidebaricon/sidebaricon";

export const AdminOperation = [
    {
        label: 'User Management',
        url: '/user-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: userManagementIcon,
    },
    {
        label: 'Staff Management',
        url: '/staff-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: staffManagementIcon,
    },
    {
        label: 'Product Management',
        url: '/product-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: productManagementIcon,
    },
    {
        label: 'Order Management',
        url: '/order-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: orderManagementIcon,
    },
    {
        label: 'Offer Management',
        url: '/offer-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: offerManagementIcon,
    },
    {
        label: 'Blog Management',
        url: '/blog-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: blogManagementIcon,
    },
    {
        label: 'Reward Management',
        url: '',
        permissionTypes: ['access'],
        icon: rewardManagementIcon,
        children: [
            {
                label: 'Lucky Draw Management',
                url: '/lucky-draw-management',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Reward Management',
                icon: luckyDrawManagementIcon
            },
            {
                label: 'Spin Reward Management',
                url: '/spin-reward-management',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Reward Management',
                icon: spinRewardManagementIcon
            },
        ]
    },
    {
        label: 'Refer & Earn',
        url: '',
        permissionTypes: ['access'],
        icon: referandearnIcon,
        children: [
            {
                label: 'Referral Tracking',
                url: '/refer-and-earn-user',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Refer & Earn',
                icon: refferralTrackingIcon
            },
            {
                label: 'Upload Video',
                url: '/upload-video',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Refer & Earn',
                icon: uploadVideoIcon
            }
        ]
    },
    {
        label: 'Report & Analytics',
        url: '',
        permissionTypes: ['access'],
        icon: reportandanalyticsIcon,
        children: [
            {
                label: 'Reports',
                url: '/reports',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Report & Analytics',
                icon: reportsIcon
            },
            {
                label: 'Staff Performance"',
                url: '/staff-performance',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Report & Analytics',
                icon: staffPerformanceIcon
            },
            {
                label: 'Lucky Draw Analysis',
                url: '/lucky-draw-analysis',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Report & Analytics',
                icon: luckyDrawAnalysisIcon
            },
        ]
    },
    {
        label: 'Monetary Settings',
        url: '',
        permissionTypes: ['access'],
        icon: commissionsettingsIcon,
        children: [
            {
                label: 'Commission Settings',
                url: '/commission-settings',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Monetary Settings',
                icon: staffCommissionIcon
            },
            {
                label: 'Coin Settings',
                url: '/coin-settings',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Monetary Settings',
                icon: coinSettingIcon
            },
            {
                label: 'Withdraw Settings',
                url: '/withdraw-settings',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'Monetary Settings',
                icon: productManagementIcon
            }
        ]
    },
    {
        label: 'Target Management',
        url: '/target-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: targetManagementIcon
    },
    {
        label: 'Country Management',
        url: '/country-management',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: countryManagementIcon
    },
    {
        label: 'Send Notification',
        url: '/notification-management/send-notification',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: productManagementIcon
    },
    {
        label: 'Manage Redeem Request',
        url: '/manage-redeem-request',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: manageReddemRequestIcon
    },
    {
        label: 'Chat Support System',
        url: '/chat-support-system',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: chatSupportSystemIcon
    },
    {
        label: 'Comment & Reviews',
        url: '/manage-comments',
        permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
        icon: commentandReviewIcon
    },
    {
        label: 'App Management',
        url: '',
        permissionTypes: ['access'],
        icon: appManagementIcon,
        children: [
            {
                label: 'About Us',
                url: '/app-management/about-us',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'App Management',
                icon: FiInfo
            },
            {
                label: 'Terms & Conditions',
                url: '/app-management/terms-and-conditions',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'App Management',
                icon: termAndConditionsIcon
            },
            {
                label: 'Privacy Policy',
                url: '/app-management/privacy-policy',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'App Management',
                icon: privicyPolicyIcon
            },
            {
                label: 'Manage Banner',
                url: '/app-management/manage-banner',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'App Management',
                icon: manageBannerIcon
            },
            {
                label: 'Help & Support',
                url: '/app-management/help-and-support',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'App Management',
                icon: helpAndSupportIcon
            },
            {
                label: 'Other Settings',
                url: '/app-management/other-settings',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'App Management',
                icon: otherSettingsIcon
            },
            {
                label: 'FAQ',
                url: '/app-management/faq',
                permissionTypes: ['create', 'read', 'update', 'delete', 'access'],
                parent: 'App Management',
                icon: otherSettingsIcon
            }
        ]
    },
]