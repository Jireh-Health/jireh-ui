"use client";

import { useState } from "react";
import { Stack } from "@jireh-health/ui/components/Stack";
import { Text } from "@jireh-health/ui/components/Text";
import { TextField } from "@jireh-health/ui/components/TextField";
import { TextArea } from "@jireh-health/ui/components/TextArea";
import { SearchField } from "@jireh-health/ui/components/SearchField";
import { Select } from "@jireh-health/ui/components/Select";
import { Checkbox } from "@jireh-health/ui/components/Checkbox";
import { RadioGroup } from "@jireh-health/ui/components/RadioGroup";
import { Switch } from "@jireh-health/ui/components/Switch";
import { InputOtp } from "@jireh-health/ui/components/InputOtp";
import { Label } from "@jireh-health/ui/components/Label";
import { Calendar } from "@jireh-health/ui/components/Calendar";
import { SearchableSelect } from "@jireh-health/ui/components/SearchableSelect";
import { PhoneInput } from "@jireh-health/ui/components/PhoneInput";
import type { Country } from "@jireh-health/ui/components/PhoneInput";
import { DemoSection, PageHeader, type PropDef } from "@/components/DemoSection";

export default function InputPage() {
  const [searchValue, setSearchValue] = useState("");
  const [radioValue, setRadioValue] = useState("mpesa");
  const [switchChecked, setSwitchChecked] = useState(true);
  const [switchSm, setSwitchSm] = useState(false);
  const [otpValue, setOtpValue] = useState("38");
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [selectableValue, setSelectableValue] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<Country | null>(null);

  const textFieldProps: PropDef[] = [
    { name: "label", type: "string", description: "Label text displayed above the input." },
    { name: "helperText", type: "string", description: "Helper text displayed below the input." },
    { name: "error", type: "string", description: "Error message. When set, the field shows an error state." },
    { name: "maxCharacters", type: "number", description: "Maximum character count. Displays a counter below the input." },
    { name: "currentLength", type: "number", description: "Current character count shown in the counter." },
    { name: "type", type: '"text" | "email" | "password" | "url" | "tel" | "number" | "search"', default: '"text"', description: "The HTML input type." },
  ];

  const textAreaProps: PropDef[] = [
    { name: "label", type: "string", description: "Label text displayed above the textarea." },
    { name: "helperText", type: "string", description: "Helper text displayed below the textarea." },
    { name: "error", type: "string", description: "Error message. When set, the field shows an error state." },
    { name: "rows", type: "number", default: "3", description: "Number of visible text rows." },
  ];

  const searchFieldProps: PropDef[] = [
    { name: "value", type: "string", required: true, description: "The current search input value." },
    { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", required: true, description: "Called when the input value changes." },
    { name: "onClear", type: "() => void", description: "Called when the clear button is clicked. The clear button only appears when a value is present and onClear is provided." },
    { name: "label", type: "string", description: "Label text displayed above the search field." },
    { name: "placeholder", type: "string", default: '"Search..."', description: "Placeholder text for the input." },
  ];

  const selectProps: PropDef[] = [
    { name: "options", type: "SelectOption[]", required: true, description: "Array of { value, label } objects to display as options." },
    { name: "label", type: "string", description: "Label text displayed above the select." },
    { name: "helperText", type: "string", description: "Helper text displayed below the select." },
    { name: "error", type: "string", description: "Error message. When set, the field shows an error state." },
    { name: "placeholder", type: "string", description: "Placeholder text shown as a disabled first option." },
  ];

  const checkboxProps: PropDef[] = [
    { name: "label", type: "string", description: "Label text displayed next to the checkbox." },
    { name: "helpText", type: "string", description: "Help text displayed below the label." },
    { name: "checked", type: "boolean", description: "Whether the checkbox is checked (controlled)." },
    { name: "disabled", type: "boolean", description: "Whether the checkbox is disabled." },
    { name: "defaultChecked", type: "boolean", description: "Initial checked state (uncontrolled)." },
  ];

  const radioGroupProps: PropDef[] = [
    { name: "options", type: "RadioOption[]", required: true, description: "Array of { value, label } objects to display as radio buttons." },
    { name: "label", type: "string", description: "Legend text displayed above the radio group." },
    { name: "value", type: "string", description: "The currently selected value (controlled)." },
    { name: "onChange", type: "(value: string) => void", description: "Called when the selection changes." },
    { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout direction of the radio options." },
    { name: "name", type: "string", description: "HTML name attribute for the radio group. Auto-generated if omitted." },
    { name: "disabled", type: "boolean", description: "Whether the entire group is disabled." },
  ];

  const switchProps: PropDef[] = [
    { name: "label", type: "string", description: "Label text displayed next to the switch." },
    { name: "checked", type: "boolean", default: "false", description: "Whether the switch is on." },
    { name: "onChange", type: "(checked: boolean) => void", description: "Called when the switch is toggled." },
    { name: "size", type: '"sm" | "md"', default: '"md"', description: "Size of the switch track and thumb." },
    { name: "disabled", type: "boolean", description: "Whether the switch is disabled." },
  ];

  const inputOtpProps: PropDef[] = [
    { name: "value", type: "string", required: true, description: "The current OTP value." },
    { name: "onChange", type: "(value: string) => void", required: true, description: "Called when any digit changes." },
    { name: "length", type: "number", default: "6", description: "Number of OTP digit fields." },
    { name: "disabled", type: "boolean", description: "Whether all digit inputs are disabled." },
    { name: "aria-label", type: "string", default: '"One-time password"', description: "Accessible label for the OTP group." },
  ];

  const labelProps: PropDef[] = [
    { name: "children", type: "ReactNode", description: "The label content." },
    { name: "htmlFor", type: "string", description: "The id of the form element this label is for." },
    { name: "required", type: "boolean", description: "When true, renders a red asterisk after the label text." },
    { name: "disabled", type: "boolean", description: "When true, dims the label color and changes the cursor." },
  ];

  const calendarProps: PropDef[] = [
    { name: "value", type: "Date | null", description: "The currently selected date." },
    { name: "onChange", type: "(date: Date) => void", description: "Called when a day is selected." },
    { name: "min", type: "Date", description: "Earliest selectable date." },
    { name: "max", type: "Date", description: "Latest selectable date." },
    { name: "locale", type: "string", default: '"en-US"', description: "Locale used for month names and date formatting." },
    { name: "yearRange", type: "[number, number]", description: "Min and max year for the year dropdown. Defaults to [currentYear - 100, currentYear + 10]." },
  ];

  const searchableSelectProps: PropDef[] = [
    { name: "options", type: "SearchableSelectOption[]", required: true, description: "Array of { value, label, disabled? } objects to display as options." },
    { name: "value", type: "string", description: "The currently selected value." },
    { name: "onChange", type: "(value: string) => void", description: "Called when an option is selected." },
    { name: "placeholder", type: "string", default: '"Select..."', description: "Placeholder text when no option is selected." },
    { name: "searchPlaceholder", type: "string", default: '"Search..."', description: "Placeholder text for the search input inside the dropdown." },
    { name: "disabled", type: "boolean", description: "Whether the select trigger is disabled." },
    { name: "hasError", type: "boolean", description: "When true, shows an error border on the trigger." },
    { name: "emptyMessage", type: "string", default: '"No results found"', description: "Message shown when no options match the search query." },
  ];

  const phoneInputProps: PropDef[] = [
    { name: "value", type: "string", description: "The phone number digits (without dial code)." },
    { name: "onChange", type: "(value: string, country: Country) => void", description: "Called when the phone number or country changes." },
    { name: "defaultCountry", type: "string", default: '"KE"', description: "ISO country code for the initially selected country." },
    { name: "allowedCountries", type: "string[]", description: "When set, only these country codes are shown in the dropdown." },
    { name: "disallowedCountries", type: "string[]", description: "When set, these country codes are excluded from the dropdown." },
    { name: "placeholder", type: "string", default: '"712 345 678"', description: "Placeholder text for the phone input." },
    { name: "disabled", type: "boolean", description: "Whether the input and country picker are disabled." },
    { name: "label", type: "string", description: "Label text displayed above the input." },
    { name: "error", type: "string", description: "Error message displayed below the input." },
  ];

  return (
    <div style={{ maxWidth: "64rem" }}>
      <PageHeader
        title="Selection & Input"
        description="Form controls for collecting user data — text fields, selects, checkboxes, radios, switches, OTP, labels, calendars, searchable selects, and phone input."
        count={12}
      />

      <DemoSection id="text-field" title="TextField" props={textFieldProps} usage={`import { TextField } from "@jireh-health/ui/components/TextField";

<TextField
  label="Full name"
  placeholder="e.g. John Kamau"
  helperText="As it appears on your national ID"
/>

<TextField
  label="National ID"
  error="This ID number is already registered"
/>`}>
        <Stack gap="4">
          <TextField label="Full name" placeholder="e.g. John Kamau" helperText="As it appears on your national ID" />
          <TextField label="Phone number" placeholder="+254 7XX XXX XXX" helperText="We will send a verification code to this number" />
          <TextField label="National ID" placeholder="Enter your ID number" error="This ID number is already registered" />
          <TextField label="Bio (optional)" placeholder="Tell us about yourself" maxCharacters={120} currentLength={47} />
        </Stack>
      </DemoSection>

      <DemoSection id="text-area" title="TextArea" props={textAreaProps} usage={`import { TextArea } from "@jireh-health/ui/components/TextArea";

<TextArea
  label="Invoice notes"
  placeholder="Add any notes..."
  rows={3}
/>`}>
        <Stack gap="4">
          <TextArea label="Invoice notes" placeholder="Add any notes about this invoice for the provider..." rows={3} />
          <TextArea label="Medical history" placeholder="Describe relevant medical history..." rows={4} />
        </Stack>
      </DemoSection>

      <DemoSection id="search-field" title="SearchField" props={searchFieldProps} usage={`import { SearchField } from "@jireh-health/ui/components/SearchField";

const [value, setValue] = useState("");

<SearchField
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue("")}
  placeholder="Search hospitals..."
/>`}>
        <SearchField
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue("")}
          placeholder="Search hospitals, clinics, or pharmacies..."
          label="Find a care provider"
        />
      </DemoSection>

      <DemoSection id="select" title="Select" props={selectProps} usage={`import { Select } from "@jireh-health/ui/components/Select";

<Select
  label="Care provider"
  placeholder="Select a hospital"
  options={[
    { value: "nairobi-hospital", label: "Nairobi Hospital" },
    { value: "aga-khan", label: "Aga Khan University Hospital" },
  ]}
/>`}>
        <Stack gap="4">
          <Select
            label="Care provider"
            placeholder="Select a hospital or clinic"
            helperText="Choose from our in-network providers"
            options={[
              { value: "nairobi-hospital", label: "Nairobi Hospital" },
              { value: "kenyatta-national", label: "Kenyatta National Hospital" },
              { value: "aga-khan", label: "Aga Khan University Hospital" },
              { value: "mp-shah", label: "MP Shah Hospital" },
              { value: "gertrudes", label: "Gertrude's Children's Hospital" },
            ]}
          />
          <Select
            label="Department"
            placeholder="Select department"
            options={[
              { value: "outpatient", label: "Outpatient" },
              { value: "inpatient", label: "Inpatient" },
              { value: "pharmacy", label: "Pharmacy" },
              { value: "lab", label: "Laboratory" },
              { value: "radiology", label: "Radiology" },
            ]}
          />
        </Stack>
      </DemoSection>

      <DemoSection id="checkbox" title="Checkbox" props={checkboxProps} usage={`import { Checkbox } from "@jireh-health/ui/components/Checkbox";

<Checkbox
  label="I agree to the Terms of Service"
  helpText="You must agree before proceeding"
/>
<Checkbox label="Send receipt via SMS" defaultChecked />`}>
        <Stack gap="3">
          <Checkbox label="I agree to the Jireh Terms of Service" helpText="You must agree before proceeding with the payment" />
          <Checkbox label="Send payment receipt via SMS" defaultChecked />
          <Checkbox label="Enable auto-debit from Care Saver" helpText="Automatically deduct monthly contributions" />
          <Checkbox label="Archived records (read-only)" disabled defaultChecked />
        </Stack>
      </DemoSection>

      <DemoSection id="radio-group" title="RadioGroup" props={radioGroupProps} usage={`import { RadioGroup } from "@jireh-health/ui/components/RadioGroup";

const [value, setValue] = useState("mpesa");

<RadioGroup
  label="Payment method"
  options={[
    { value: "mpesa", label: "M-PESA" },
    { value: "wallet", label: "Jireh Wallet" },
  ]}
  value={value}
  onChange={setValue}
/>`}>
        <Stack gap="6">
          <RadioGroup
            label="Payment method"
            options={[
              { value: "mpesa", label: "M-PESA" },
              { value: "wallet", label: "Jireh Wallet" },
              { value: "care-saver", label: "Care Saver" },
              { value: "bank", label: "Bank transfer" },
            ]}
            value={radioValue}
            onChange={setRadioValue}
          />
          <RadioGroup
            label="Visit type"
            orientation="horizontal"
            options={[
              { value: "outpatient", label: "Outpatient" },
              { value: "inpatient", label: "Inpatient" },
              { value: "emergency", label: "Emergency" },
            ]}
            value="outpatient"
            onChange={() => {}}
          />
        </Stack>
      </DemoSection>

      <DemoSection id="switch" title="Switch" props={switchProps} usage={`import { Switch } from "@jireh-health/ui/components/Switch";

const [enabled, setEnabled] = useState(false);

<Switch
  label="Enable push notifications"
  checked={enabled}
  onChange={setEnabled}
  size="md"
/>`}>
        <Stack gap="3">
          <Switch label="Enable push notifications" checked={switchChecked} onChange={setSwitchChecked} size="md" />
          <Switch label="Auto-save receipts" checked={switchSm} onChange={setSwitchSm} size="sm" />
          <Switch label="Biometric login (disabled)" checked={false} onChange={() => {}} size="md" disabled />
        </Stack>
      </DemoSection>

      <DemoSection id="input-otp" title="InputOtp" props={inputOtpProps} usage={`import { InputOtp } from "@jireh-health/ui/components/InputOtp";

const [otp, setOtp] = useState("");

<InputOtp length={6} value={otp} onChange={setOtp} />`}>
        <Stack gap="3">
          <Text variant="body-sm" color="muted">
            Enter the 6-digit code sent to +254 712 XXX XXX
          </Text>
          <InputOtp length={6} value={otpValue} onChange={setOtpValue} />
        </Stack>
      </DemoSection>

      <DemoSection id="label" title="Label" props={labelProps} usage={`import { Label } from "@jireh-health/ui/components/Label";

<Label htmlFor="name">Patient name</Label>
<Label htmlFor="phone" required>Phone number</Label>
<Label htmlFor="archived" disabled>Read-only field</Label>`}>
        <Stack gap="3">
          <Label htmlFor="demo-name">Patient name</Label>
          <Label htmlFor="demo-required" required>Phone number</Label>
          <Label htmlFor="demo-disabled" disabled>Archived field (read-only)</Label>
        </Stack>
      </DemoSection>

      <DemoSection id="calendar" title="Calendar" props={calendarProps} usage={`import { Calendar } from "@jireh-health/ui/components/Calendar";

const [date, setDate] = useState<Date | null>(null);

<Calendar value={date} onChange={setDate} />

// With custom year range (e.g. date of birth)
<Calendar
  value={date}
  onChange={setDate}
  yearRange={[1920, 2026]}
/>`}>
        <Stack gap="3">
          <Text variant="body-sm" color="muted">
            {calendarDate
              ? `Selected: ${calendarDate.toLocaleDateString("en-KE", { dateStyle: "long" })}`
              : "Pick an appointment date"}
          </Text>
          <Calendar value={calendarDate} onChange={setCalendarDate} />
        </Stack>
      </DemoSection>

      <DemoSection id="searchable-select" title="SearchableSelect" props={searchableSelectProps} usage={`import { SearchableSelect } from "@jireh-health/ui/components/SearchableSelect";

const [value, setValue] = useState("");

<SearchableSelect
  options={[
    { value: "nairobi-hospital", label: "Nairobi Hospital" },
    { value: "aga-khan", label: "Aga Khan University Hospital" },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Search for a hospital..."
/>`}>
        <Stack gap="4">
          <SearchableSelect
            options={[
              { value: "nairobi-hospital", label: "Nairobi Hospital" },
              { value: "kenyatta-national", label: "Kenyatta National Hospital" },
              { value: "aga-khan", label: "Aga Khan University Hospital" },
              { value: "mp-shah", label: "MP Shah Hospital" },
              { value: "gertrudes", label: "Gertrude's Children's Hospital" },
              { value: "mater", label: "Mater Hospital" },
              { value: "avenue", label: "Avenue Hospital" },
              { value: "karen", label: "Karen Hospital" },
            ]}
            value={selectableValue}
            onChange={setSelectableValue}
            placeholder="Search for a hospital..."
            searchPlaceholder="Type to filter..."
          />
          <Text variant="body-sm" color="muted">
            {selectableValue ? `Selected: ${selectableValue}` : "No provider selected"}
          </Text>
        </Stack>
      </DemoSection>

      <DemoSection id="phone-input" title="PhoneInput" props={phoneInputProps} usage={`import { PhoneInput } from "@jireh-health/ui/components/PhoneInput";
import type { Country } from "@jireh-health/ui/components/PhoneInput";

const [phone, setPhone] = useState("");

<PhoneInput
  label="Phone number"
  value={phone}
  onChange={(value, country) => setPhone(value)}
  defaultCountry="KE"
/>

// Restrict to East African countries only
<PhoneInput
  value={phone}
  onChange={(value) => setPhone(value)}
  allowedCountries={["KE", "UG", "TZ", "RW"]}
/>

// Exclude specific countries
<PhoneInput
  value={phone}
  onChange={(value) => setPhone(value)}
  disallowedCountries={["US", "GB"]}
/>`}>
        <Stack gap="6">
          <PhoneInput
            label="Phone number"
            value={phone}
            onChange={(value: string, country: Country) => {
              setPhone(value);
              setPhoneCountry(country);
            }}
            defaultCountry="KE"
            placeholder="712 345 678"
          />
          <Text variant="body-sm" color="muted">
            {phone
              ? `Number: ${phoneCountry?.dialCode ?? "+254"} ${phone}`
              : "Enter a phone number"}
          </Text>
          <PhoneInput
            label="East Africa only"
            value=""
            onChange={() => {}}
            allowedCountries={["KE", "UG", "TZ", "RW", "BI", "SS"]}
            defaultCountry="KE"
          />
          <PhoneInput
            label="With error"
            value="123"
            onChange={() => {}}
            error="Please enter a valid phone number"
            defaultCountry="KE"
          />
        </Stack>
      </DemoSection>
    </div>
  );
}
