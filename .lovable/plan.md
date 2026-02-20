

# Admin Panel: Integrations & API Management Hub

## Overview
Add a new "Integrations" tab to the Admin Dashboard that serves as a central hub for managing external platform connections (Reelo, PetPooja, etc.) and provides an API-style interface for full CRUD operations on bookings, customers, and menu data.

## What This Adds

### 1. New "Integrations" Tab in Admin Dashboard
A fourth tab alongside Bookings, Messages, and Menu with two sub-sections:

**A. Data Management (API Console)**
- A unified interface to **add, edit, delete, and search** across all data types:
  - **Bookings**: Full CRUD with all fields (type, date, guests, status, contact info, special requests)
  - **Customers**: A new customer directory - add/edit/remove customer profiles (name, email, phone, visit history, notes, loyalty status)
  - **Menu Items**: Enhanced editing with image URLs, video URLs, pricing, availability
- Each section gets a table view with inline actions and a "quick add" form
- Search and filter capabilities across all records
- Bulk actions (export data, bulk status update, bulk delete)

**B. Platform Connections**
Cards for connecting external restaurant management platforms:

- **Reelo** - Customer loyalty, CRM, WhatsApp marketing, feedback & reviews
- **PetPooja** - POS, billing, inventory management, online ordering
- **Custom Webhook** - Connect any platform via webhook URL (Zapier-style)

Each platform card shows:
  - Platform name, logo placeholder, and description
  - Connection status (Connected / Not Connected)
  - API Key / Webhook URL input field
  - Connect / Disconnect button
  - Connection settings saved to localStorage (for demo; production would use Supabase secrets)

### 2. New Customer Data Model
A `Customer` interface to track customer information separately from bookings:
```
- id, name, email, phone
- totalVisits, lastVisit
- loyaltyPoints, membershipTier
- tags (e.g., "VIP", "Regular", "Birthday Club")
- notes
```

### 3. Updated Quick Stats
Add a "Customers" stat card to the dashboard header showing total customers count.

## Technical Details

### Files to Create
- `src/components/admin/IntegrationsTab.tsx` - Main integrations tab with sub-tabs for Data Management and Platform Connections
- `src/components/admin/DataManager.tsx` - CRUD table interface for bookings/customers/menu
- `src/components/admin/PlatformConnections.tsx` - Platform connection cards (Reelo, PetPooja, Custom Webhook)
- `src/components/admin/CustomerManager.tsx` - Customer directory with add/edit/search
- `src/types/admin.ts` - Customer and Integration types

### Files to Modify
- `src/pages/Admin.tsx` - Add the Integrations tab, Customer state, updated stats grid (5 stats instead of 4)

### Architecture
- All data remains in React state (same pattern as existing bookings/messages/menu)
- Platform connections store API keys/webhook URLs in localStorage for demo
- Webhook integration uses `fetch` with `no-cors` mode (same as Zapier pattern)
- Customer data can be linked to bookings via email matching

### UI Pattern
- Follows existing Admin dashboard styling (cards, badges, modals, filters)
- Sub-tabs within the Integrations tab using the same `Tabs` component
- Platform cards use the existing `Card` component with status badges
- Data tables use a clean card-based layout consistent with the bookings list

