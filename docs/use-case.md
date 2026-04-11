---
title: Planthor Use Case
sidebar_label: Use Cases
sidebar_position: 8
---

# Epic01 - Authentication
## UC01: Log-in by Facebook Account
UI : https://www.figma.com/design/yqTi4zKDeLGvZXZiepxFAB/Planthor?node-id=0-1&t=EbUI3T9PcDe4hQva-1


| Section | Details |
| :--- | :--- |
| **UC01** | **Log-in by Facebook Account** |
| **Dependencies** | • *Epic01* Authentication <br /> • *Objective* Frictionless Onboarding & Trust |
| **Description** | Single Sign-On (SSO) flow allowing an athlete to securely authenticate and generate a Planthor user profile via Facebook. |
| **Precondition** | • The user has installed the Planthor mobile application. <br /> • The user is currently unauthenticated. <br /> • The user possesses a valid, active Facebook account. |
| **Actors** | **Primary:** End User (Athlete)<br />**Secondary:** Planthor System<br />**Tertiary:** Third-Party OAuth Provider (Facebook) |
| **Ordinary Sequence** | **1. User** - Navigates to Planthor Login/Sign-Up screen.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 System** - Displays "Continue with Facebook" button.<br />**2. User** - Taps "Continue with Facebook".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 System** - Redirects to Facebook OAuth consent screen.<br />**3. User** - Selects Facebook account & authorizes Planthor.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 External provider - Facebook** - Returns an authorization token.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 System** - Validates the token and checks if email is registered.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.3 System** - Provisions Profile, issues a JWT, and logs user in.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.4 System** - Redirects user to the Home page. |
| **Postcondition** | The system maps the account to the social identity, generates a session token, and redirects the user to the next appropriate screen. |
| **Exceptions** | **Step 3 (EF1):** User Denies Authorization on Facebook screen -> cancel login.<br />**General (EF2):** No Internet Connection -> show warning toast: "No connection".<br />**General (EF3):** External provider API Timeout -> show error toast: "Authentication timed out. Please try again later." |
| **Alternate Flows** | **Step 3.2 (AF1):** Returning User Log-In - System recognizes the email/Provider ID. It skips step 3.3 (profile generation), issues a new JWT, and logs the user in directly to the User's Dashboard. |
| **Business Rules** | • System explicitly pulls Name and Profile Picture for instant personalization. |
| **Target KPI** | • >85% Sign-Up Conversion Rate.<br />• >70% Adoption Rate. |


---

## UC02 - Log Out

| Section | Details |
| :--- | :--- |
| **UC02** | **Log Out** |
| **Dependencies** | • *Epic01* Authentication <br /> • *Objective* Security & Resource Management |
| **Description** | Allows an authenticated athlete to securely terminate their session, clearing all local cached data and invalidating the backend token. |
| **Precondition** | • The user is currently authenticated with an active session.<br />• The user is actively using the application (e.g., viewing Dashboard/Settings). |
| **Actors** | **Primary:** End User (Athlete)<br />**Secondary:** Planthor System |
| **Ordinary Sequence** | **1. User** - Navigates to the "Profile / Settings" interface and taps the "Log Out" CTA.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 System** - Presents a confirmation modal: "Are you sure you want to log out?".<br />**2. User** - Confirms by tapping "Yes, Log Out".<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 System** - Sends a `POST /logout` request to the backend to invalidate the active JWT.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.2 System** - Backend successfully invalidates the token, blacklists it, and responds with 200 OK.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.3 System** - Mobile app irreversibly purges all local disk storage (tokens, cached runs, profile) for privacy.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.4 System** - Redirects the user to the unauthenticated Login/Sign-Up splash screen. |
| **Postcondition** | The user's local session token is cleared, local data is purged, backend invalidates the session, and user returns to Login screen. |
| **Exceptions** | **Step 1.1 (EF1):** User Cancels Log Out -> Modal closes gracefully, user remains fully authenticated on the Settings screen.<br />**Step 2.1 (EF2):** Backend Timeout During Log Out -> System defaults to Offline Log Out fail-safe (AF1). |
| **Alternate Flows** | **Step 2.1 (AF1):** Offline Log Out (Forced Local Clear) - Mobile app identifies offline state, explicitly purges local storage, logs user out locally, and queues a background task to invalidate backend JWT upon returning online. |
| **Business Rules** | • System must irreversibly purge all local disk storage to ensure total privacy upon logout. |
| **Target KPI** | • 100% of initiated logouts result in successfully cleared local storage and revoked JWTs.<br />• Near-zero support inquiries reporting unauthorized access on previously used devices. |
| **Comments** | • Privacy & Compliance: Ensure that the "Log Out" action instantly and irretrievably scrubs local PII (Personally Identifiable Information) from the device cache, fully complying with standard data protection protocols (GDPR/CCPA frameworks). |

---

## UC03: Strava Connection Prompt

| Section | Details |
| :--- | :--- |
| **UC03** | **Strava Connection Prompt** |
| **Dependencies** | • *Epic01* Authentication <br /> • *Objective* Conversion & Data Enrichment |
| **Description** | Persistent Strava connection indicator and explicit OAuth integration flow for users who skipped the initial onboarding modal. |
| **Precondition** | • The user is logged into Planthor via Facebook.<br />• The user has *not* connected their Strava account.<br />• The user is viewing the Plan dashboard. |
| **Actors** | **Primary:** End User (Athlete)<br />**Secondary:** Planthor System<br />**Tertiary:** External Provider (Strava) |
| **Ordinary Sequence** | **1. User** - Views Plan dashboard UI.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 System** - Detects no active Strava OAuth token.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 System** - Displays a persistent "Not connected" indicator banner/button at the top of the Plan dashboard.<br />**2. User** - Taps the "Not connected" indicator.<br />&nbsp;&nbsp;&nbsp;&nbsp;**2.1 System** - Halts any background polling, initiates Strava OAuth flow, and redirects the user to the Strava authorization screen.<br />**3. User** - Explicitly grants Planthor permission to access their Strava data.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 External provider - Strava** - Redirects user back to Planthor with authorization code.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 System** - Exhanges code for access/refresh token and seamlessly links it to the profile.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.3 System** - Returns user to the native Plan dashboard UI.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.4 System** - Removes "Not connected" indicator. |
| **Postcondition** | User's Strava account is connected and the "Not connected" indicator is removed from the Plan dashboard. |
| **Exceptions** | **Step 3.2 (EF1):** Token Exchange Failure / API Timeout -> User is returned to Plan dashboard. Warning toast appears: "Failed to connect to Strava. Please try again later." Indicator remains visible for future retry. |
| **Alternate Flows** | **Step 3 (AF1):** User Cancels Authorization - Taps "Cancel" on Strava auth screen. User receives System redirect back to Planthor Plan dashboard. Toast notification: "Strava connection cancelled." Indicator remains visible. |
| **Business Rules** | • System must enable automatic syncing of completed runs to directly power dashboard analytics and visualizations. |
| **Target KPI** | • Tracks the % of users who skipped the initial modal but seamlessly connect via this indicator within 7 days.<br />• Tap-Through Rate (TTR): Number of indicator taps vs. total dashboard views by unconnected users. |

---

# Epic02 - Plan dashboard

## UC01: View Active Plans

| Section | Details |
| :--- | :--- |
| **UC01** | **View Active Plans** |
| **Dependencies** | • *Epic02* Plan dashboard <br /> • *Objective* Primary User Engagement |
| **Description** | The central Plan dashboard view serving as the user's primary interface. It displays the comprehensive list of active fitness plans and their dynamically calculated current progress based on the Ghost Aggregate architectural pattern. |
| **Precondition** | • The user is successfully authenticated.<br />• The user has at least one active plan (to view the populated state). |
| **Actors** | **Primary:** End User (Athlete)<br />**Secondary:** Planthor System |
| **Ordinary Sequence** | **1. User** - Opens the app and click on the primary Plans tab.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 System** - Fetches the user's active Plan records from the backend.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 System** - Computes on-the-fly Ghost Aggregate progress (activities belonging to the plan's timeframe and sport type).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.3 System** - Renders the Active Plans list with visual progress indicators. |
| **Postcondition** | The user receives a real-time snapshot of their ongoing progress across all active fiat goals. |
| **Exceptions** | **General (EF1):** Network failure during fetch -> System displays a toast: "Failed to update data - Please try again". Plan dashboard continues to show cached data with an offline indicator. |
| **Alternate Flows** | **Alternate (AF1):** Empty State -> If the user has zero active plans, the system displays a "No active plans yet" placeholder/illustration. |
| **Business Rules** | • **BR1 (Ghost Aggregate Enforcement):** Plan progress is NEVER stored as a static column. The system dynamically sums matching activities occurring within the Plan's `StartDate` and `EndDate`.<br />• **BR2 (Over-Achievement Logic):** Progress calculation natively allows >100% completion (e.g., 120% / 12 out of 10 walks) without breaking UI limits or capping the aggregate sum.<br />• **BR3 (Progress Ring Color Code):** The ring and icon are Blue while in-progress (&lt;100%) and instantly transition to Green upon reaching/surpassing the 100% threshold. |
| **UI Components & Rules** | • **Not connected Badge**: Pill indicator. *Rule:* Displays "Not connected" ONLY if the user hasn't successfully linked an external sync source (like Strava); tapping triggers the interaction sequence defined in **EP01 - UC03**.<br />• **Refresh Icon**: Action icon. *Rule:* Displays ONLY if the user HAS successfully connected a sync source (like Strava); tapping triggers a manual background sync of activities.<br />• **Plan Card**: Container for a single plan. *Rule:* Scrollable vertically. Ordered first by In-progress plans (closest End Date), then followed by Completed plans (closest End Date).<br />• **Sport Progress Ring**: Circular indicator around the sport icon on Active Plans and All Plans pages. *Rule:* The stroke arc dynamically fills based on the % progress of that specific plan. It becomes a full Green ring if >= 100%.<br />• **Metric Display (Value / Target)**: "40 / 100 km" format. *Rule:* The numerator is the exact Ghost Aggregate calculation; unit label dynamically maps to the target.<br />• **Percentage Achieved Text**: Text string displaying the percentage. *Rule:* Displays Blue text for &lt;100%, Green text for >= 100%.<br />• **Completion State Icons**: Contextual visual flair. *Rule:* Displays a green 'checkmark' upon hitting exactly 100%, and a green 'celebration/party popper' icon if the user over-achieves (>100%).<br />• **Details Button**: Secondary CTA on each card. *Rule:* Navigates to a detailed analytical breakdown of that specific plan's underlying activities (UC03).<br />• **View All Plans Link**: Inline text link at the list bottom. *Rule:* Navigates the user to their historical / paginated plans archive view.<br />• **Create Plan FAB (+)**: Persistent Floating Action Button. *Rule:* Primary core CTA mapped directly to trigger UC02 (Create a Plan). |
| **Target KPI** | • >80% DAU/MAU engage heavily with this specific screen.<br />• High CTR (Click-Through Rate) on the interior 'Details' CTA. |


---

## UC02: Create a Plan
UI:https://www.figma.com/design/yqTi4zKDeLGvZXZiepxFAB/Planthor?node-id=49-1260&t=n2q6LCLz7mVUijaU-0
| Section | Details |
| :--- | :--- |
| **UC02** | **Create a Plan** |
| **Dependencies** | • *Epic02* Plan dashboard <br /> • *Objective* Activation & Granular Tracking |
| **Description** | Single-page form enabling an athlete to strictly declare a new 1-level fiat fitness project mapped by Sport Type to establish app stickiness. |
| **Precondition** | • The user is logged into the Planthor system.<br />• The user is viewing the Plan dashboard. |
| **Actors** | **Primary:** End User (Athlete)<br />**Secondary:** Planthor System |
| **Ordinary Sequence** | **1. User** - Taps the "Create New Plan" button on the Plan dashboard.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 System** - Opens the 'Create Plan' single-page view.<br />**2. User** - Fills out the overarching Plan Goal section: entering Plan Name, selecting Sport Type, setting Start Date and End Date, and defining the Goal metric.<br />**3. User** - Taps "Save Plan" at the bottom of the form.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.1 System** - Saves the Plan to the database.<br />&nbsp;&nbsp;&nbsp;&nbsp;**3.2 System** - Returns user to Plan dashboard and distinctly displays a success toast: "Plan created successfully!". The dynamic new plan is visible immediately. |
| **Postcondition** | A new 1-level Plan is saved to the database. The new plan appears immediately in the User's Plans List on the Plan dashboard. |
| **Exceptions** | **General (EF1):** User leaves mandatory fields blank -> System prevents save and highlights required inline fields natively within the UI. |
| **Alternate Flows** | **Step 2 (AF1):** User Abandons Creation - User taps physical/UI "Back" or "Cancel" before saving. System reliably prompts dirty-state warning: "You have unsaved changes. Discard plan?" If user explicit confirms, system discards data and returns user to the Plan dashboard. |
| **Business Rules** | • **BR1 (Flat Structure):** A plan is a single-level entity defined strictly by Start/End Date, Sport Type, and Goal. It does not contain hierarchical nested child steps.<br />• **BR2 (Concurrent Overlapping):** A user may have multiple active plans for the exact same Sport Type with overlapping date ranges.<br />• **BR3 (Ghost Aggregate Pattern):** System must NOT store a hardcoded progress value inside the `Plan` record. Progress is explicitly calculated dynamically on-read by summing raw activities matching the criteria. |
| **UI Components & Rules** | • **Plan Name Input**: Text field for the plan's custom name. *Rule:* Mandatory string, max 50 characters.<br />• **Sport Type Dropdown**: Selectable list for the Sport Type. *Rule:* Mandatory selection, options: Run, Walk, Hike, Ride; default is "Run".<br />• **Target Distance Input**: Numeric input with unit label. *Rule:* Mandatory numeric, must be a positive number > 0.<br />• **Start Date Picker**: Calendar input for start date. *Rule:* Mandatory date, defaults to Today.<br />• **End Date Picker**: Calendar input for finish date. *Rule:* Mandatory date, must be &ge; Start Date.<br />• **Save Plan Button**: Primary CTA to submit. *Rule:* Validates all inputs on tap; disables or blocks submission if any mandatory fields are invalid/empty. |
| **Error States** | **Network Timeout/Offline (ES1):** System fails to reach backend upon saving. -> *Action:* Cache plan input locally, display an actionable toast ("Unable to save at the moment. Please try again."), preventing data loss and user frustration.<br />**Server Error (5xx) (ES2):** Backend failure during plan creation. -> *Action:* Retain user's form input (do not clear fields), log the failure for monitoring, and show a user-friendly toast ("Unable to save at the moment. Please try again.").<br />**Logical Validation Error (ES3):** End Date precedes Start Date. -> *Action:* Disable "Save Plan" CTA and provide explicit inline feedback ("End date must be after start date.") to guide the user.<br />**Input Validation Error (ES4):** Plan Name exceeds 50 characters. -> *Action:* Prevent typing beyond 50 characters. If text is pasted exceeding the limit, truncate it or disable the "Save Plan" CTA and show inline feedback ("Plan name cannot exceed 50 characters").<br />**Input Validation Error (ES5):** Target Distance is empty or zero. -> *Action:* Disable "Save Plan" CTA and showcase inline red-text feedback ("Distance must be greater than 0") below the target distance input.<br />**Form Submission Error (ES6):** User taps "Save Plan" with one or more mandatory fields blank. -> *Action:* Abort save process, outline all empty mandatory fields in red, display inline feedback ("This field is required") below each, and smoothly scroll the uppermost invalid field into view. |
| **Target KPI** | • Plan Creation Completion Rate: % of users who start creating a plan and successfully explicitly save it.<br />• Average Plans per User: Number of plans users natively create (indicator of engagement depth). |


---

## UC03: View Plan Details

| Section | Details |
| :--- | :--- |
| **UC03** | **View Plan Details** |
| **Dependencies** | • *Epic02* Plan dashboard <br /> • *Objective* Growth & Performance Analysis |
| **Description** | A drill-down view for a specific plan providing a chronological breakdown of every individual activity contributing to the total progress. It enables athletes to audit their performance logs and manage the plan's metadata. |
| **Precondition** | • The user is authenticated.<br />• The user has at least one active plan.<br />• The user has tapped the "Details" CTA on a plan card (UC01). |
| **Actors** | **Primary:** End User (Athlete)<br />**Secondary:** Planthor System |
| **Ordinary Sequence** | **1. User** - Taps "Details" on an active plan card in the Plan dashboard (UC01).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.1 System** - Transitions to the 'Plan Details' view for the selected ID.<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.2 System** - Fetches all activities from the user's linked providers (e.g., Strava).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.3 System** - Filters raw activities by the Plan's `SportType` and `Timeframe` (Start/End Date).<br />&nbsp;&nbsp;&nbsp;&nbsp;**1.4 System** - Renders the top-level progress summary and the chronological Activity Ledger containing expandable activity cards. |
| **Postcondition** | The user audits the specific activities feeding into their plan and can optionally initiate modification or deletion. |
| **Exceptions** | |
| **Alternate Flows** | **Alternate (AF1):** Empty Ledger -> If no activities currently match the plan criteria, the ledger displays: "No matching activities found for this period. Keep moving!" |
| **Business Rules** | • **BR1 (Strict Filtering):** Only activities whose timestamp falls within [StartDate, EndDate] (inclusive) and match the Plan's `SportType` are listed.<br />• **BR2 (Read-Only Activities):** Individual activities in the ledger are read-only; they cannot be edited or deleted within Planthor to maintain data integrity with the external source.<br />• **BR3 (Dynamic Recalculation):** Any change to the Plan's metadata (e.g., extending the End Date) must trigger an immediate recalculation of the Ghost Aggregate and refresh the ledger. |
| **UI Components & Rules** | • **Plan Summary Header**: Top-level visual container. *Rule:* Mirrors the Dashboard card layout showing progress ring, metric (40/100km), and percentage.<br />• **Overflow Menu (Three-Dots)**: Header action icon. *Rule:* Contains "Edit Plan" and "Delete Plan" options.<br />• **Activity Ledger**: Chronological list of activities (Newest first). *Rule:* Scrollable vertically. Each entry functions as an expandable accordion.<br />• **Performance Card (Collapsed)**: *Rule:* Displays top-level info including Title, Timestamp (e.g. March 25, 2026 at 7:26 AM), and primary core metric (Distance).<br />• **Performance Card (Expanded)**: *Rule:* Reveals a grid of detailed metrics mapped into 2 distinct groups based on Sport Type:<br />&nbsp;&nbsp;&nbsp;&nbsp;- **Group 1 (Run/Walk/Hike - Pace & Steps)**: Distance, Avg Pace, Moving Time, Elevation Gain, Max Elevation, Total Steps (or Calories).<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Contains: Run, Walk, Hike)*<br />&nbsp;&nbsp;&nbsp;&nbsp;- **Group 2 (Ride - Speed-based)**: Distance, Avg Speed, Moving Time, Elevation Gain, Max Elevation, Intensity/Power (or Calories).<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*(Contains: Ride)*<br />• **Back Navigation**: Header left icon. *Rule:* Returns the user directly to the Plan dashboard (UC01). |
| **Target KPI** | • Audit Frequency: Average number of detail-view visits per active plan.<br />• Plan Retention: Tracks if viewing details correlates with higher plan completion rates. |
