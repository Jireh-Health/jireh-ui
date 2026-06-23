export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "Overview", href: "/" },
  { label: "Getting started", href: "/getting-started" },
  {
    label: "Foundations",
    href: "/foundations",
    children: [
      { label: "Color", href: "/foundations/color" },
      { label: "Typography", href: "/foundations/typography" },
      { label: "Spacing", href: "/foundations/spacing" },
    ],
  },
  {
    label: "Components",
    href: "/components",
    children: [
      {
        label: "Layout",
        href: "/components/layout",
        children: [
          { label: "Box / Stack / Inline", href: "/components/layout#box-stack-inline" },
          { label: "Container / Grid", href: "/components/layout#container-grid" },
          { label: "Divider", href: "/components/layout#divider" },
        ],
      },
      {
        label: "Typography",
        href: "/components/typography",
        children: [
          { label: "Heading", href: "/components/typography#heading" },
          { label: "Text", href: "/components/typography#text" },
          { label: "DisplayText", href: "/components/typography#display-text" },
        ],
      },
      {
        label: "Actions",
        href: "/components/actions",
        children: [
          { label: "Button", href: "/components/actions#button" },
          { label: "IconButton", href: "/components/actions#icon-button" },
        ],
      },
      {
        label: "Selection & Input",
        href: "/components/input",
        children: [
          { label: "TextField", href: "/components/input#text-field" },
          { label: "TextArea", href: "/components/input#text-area" },
          { label: "SearchField", href: "/components/input#search-field" },
          { label: "Select", href: "/components/input#select" },
          { label: "Checkbox", href: "/components/input#checkbox" },
          { label: "RadioGroup", href: "/components/input#radio-group" },
          { label: "Switch", href: "/components/input#switch" },
          { label: "InputOtp", href: "/components/input#input-otp" },
        ],
      },
      {
        label: "Navigation",
        href: "/components/navigation",
        children: [
          { label: "Tabs", href: "/components/navigation#tabs" },
          { label: "Breadcrumb", href: "/components/navigation#breadcrumb" },
          { label: "Pagination", href: "/components/navigation#pagination" },
        ],
      },
      {
        label: "Feedback & Status",
        href: "/components/feedback",
        children: [
          { label: "Alert", href: "/components/feedback#alert" },
          { label: "Toast", href: "/components/feedback#toast" },
          { label: "Dialog", href: "/components/feedback#dialog" },
          { label: "Drawer", href: "/components/feedback#drawer" },
          { label: "Loader", href: "/components/feedback#loader" },
          { label: "ProgressBar", href: "/components/feedback#progress-bar" },
          { label: "Skeleton", href: "/components/feedback#skeleton" },
          { label: "EmptyState", href: "/components/feedback#empty-state" },
        ],
      },
      {
        label: "Data Display",
        href: "/components/data-display",
        children: [
          { label: "Card", href: "/components/data-display#card" },
          { label: "Badge", href: "/components/data-display#badge" },
          { label: "Tag", href: "/components/data-display#tag" },
          { label: "Avatar", href: "/components/data-display#avatar" },
          { label: "DataTable", href: "/components/data-display#data-table" },
          { label: "DescriptionList", href: "/components/data-display#description-list" },
          { label: "Timeline", href: "/components/data-display#timeline" },
          { label: "Accordion", href: "/components/data-display#accordion" },
        ],
      },
      {
        label: "Overlays",
        href: "/components/overlays",
        children: [
          { label: "Tooltip", href: "/components/overlays#tooltip" },
          { label: "DropdownMenu", href: "/components/overlays#dropdown-menu" },
        ],
      },
      {
        label: "Healthcare",
        href: "/components/healthcare",
        children: [
          { label: "CircleMemberCard", href: "/components/healthcare#circle-member-card" },
          { label: "CashbackBanner", href: "/components/healthcare#cashback-banner" },
          { label: "OnboardingTimeline", href: "/components/healthcare#onboarding-timeline" },
          { label: "Stepper", href: "/components/healthcare#stepper" },
          { label: "PatientDashboardSection", href: "/components/healthcare#patient-dashboard-section" },
          { label: "ErrorBlock", href: "/components/healthcare#error-block" },
          { label: "SuccessBlock", href: "/components/healthcare#success-block" },
        ],
      },
    ],
  },
];
