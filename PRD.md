# Amanah — Product Requirements & Direction

**Product:** Amanah, the Halal Financial Companion  
**Market:** Nigeria first; Nigerian Muslim diaspora later  
**Document status:** Working source of truth  
**Version:** 1.0  
**Last updated:** 16 July 2026  
**Current phase:** Phase 1 — unlicensed financial guidance, Zakat, and education

## 1. Purpose of this document

This document is the canonical reference for Amanah's product direction, MVP scope, operating boundaries, and major unresolved decisions. Product, design, engineering, content, Shariah, compliance, and commercial decisions should be checked against it.

This is a living document. Material scope or positioning changes should update the version, date, decision log, and affected requirements.

## 2. Product vision

Amanah will become the trusted starting point for Muslims managing money in Nigeria: helping people understand their finances, calculate Zakat confidently, build financial literacy, and, once appropriately licensed, access vetted halal investment opportunities.

The product will earn trust before attempting to monetize investment activity.

### Product thesis

Nigerian Muslims already have access to some Shariah-compliant investment products, particularly through established providers such as Lotus Capital. The underserved opportunity is the layer before an investment decision: Zakat, financial clarity, education, and values-aligned planning.

Amanah's initial wedge is therefore:

1. Zakat calculation and tracking.
2. A clear, descriptive view of personal finances.
3. Nigerian Muslim-specific financial education.
4. Neutral discovery of regulated providers.
5. Distribution through trusted employers, associations, cooperatives, and Muslim communities.

Personalized investment advice and product distribution are later-stage capabilities, contingent on legal review, funding, registration, and operational readiness.

## 3. Problem statement

Young Muslim professionals in Nigeria face a combination of financial and religious concerns:

- Many mainstream savings and investment products generate interest or provide insufficient clarity about Shariah compliance.
- Halal alternatives exist, but discovering and understanding them remains difficult for people who are not already investment-ready.
- Zakat calculation is often manual, inconsistent, and disconnected from everyday financial records.
- Generic budgeting and financial-planning products rarely account for Islamic financial values or the Nigerian economic context.
- Investment terminology, risk, and suitability are intimidating to new investors.
- Trust is difficult to establish when a platform appears motivated primarily by selling its own financial products.

The central problem Amanah addresses in Phase 1 is:

> Nigerian Muslims lack a trusted, digital-first, education-and-Zakat-led financial companion that helps them understand their obligations and finances before they are ready to invest.

## 4. Positioning

### Positioning statement

For Nigerian Muslims who want clarity and confidence in managing money according to their values, Amanah is a halal financial companion that combines Zakat support, financial visibility, and locally relevant education. Unlike a fund marketplace, Amanah begins as a neutral guide and does not recommend a specific investment product.

### What Amanah is in Phase 1

- A Zakat calculation and tracking tool.
- A descriptive personal-finance snapshot.
- A financial education platform.
- An informational directory of relevant regulated providers.
- A financial accountability and reminder tool.

### What Amanah is not in Phase 1

- A bank, wallet, savings account, or money-transfer service.
- A licensed investment adviser or robo-adviser.
- A broker, fund manager, or investment marketplace.
- A tool that recommends a product, provider, portfolio, or personalized investment amount.
- A Zakat collection or disbursement body.
- A substitute for advice from a qualified scholar, accountant, lawyer, or licensed financial professional.

## 5. Product principles

1. **Trust before transactions.** Help users first; do not optimize the initial experience around selling financial products.
2. **Clarity over sophistication.** Explain calculations, sources, assumptions, risks, and limitations in plain language.
3. **Neutrality must be visible.** Provider listings and educational material must not imply suitability, ranking, endorsement, or paid preference unless clearly disclosed.
4. **Shariah integrity is a product requirement.** Religious claims and calculation rules require documented scholarly governance, not decorative labels.
5. **Stay inside the regulatory boundary.** Phase 1 may describe a user's finances and provide general education but must not generate personalized investment recommendations.
6. **Privacy by design.** Collect only necessary financial data, explain its use, and provide meaningful control over deletion and retention.
7. **Nigeria first.** Currency, examples, terminology, providers, economic conditions, identity flows, and regulation should reflect the Nigerian market.
8. **Accessible by default.** The product should work for users with varying financial literacy, device quality, connectivity, and accessibility needs.

## 6. Target users

### Primary persona: emerging Muslim professional

- Age: approximately 22–35.
- Monthly income: approximately ₦120,000–₦900,000.
- Examples: technology professionals, healthcare workers, consultants, civil servants, entrepreneurs, and corporate employees.
- Needs: understand cash flow, calculate Zakat, learn about halal finance, establish trustworthy financial habits.
- Constraints: limited investable surplus, high inflation, inconsistent financial knowledge, and uncertainty about Shariah compliance.

### Secondary persona: Nigerian Muslim diaspora member

- Based initially in the UK, US, or Gulf states.
- Supports family or holds financial interests in Nigeria.
- Needs: family-linked Zakat and planning support, trustworthy Nigerian context, and eventually compliant remittance-linked financial options.
- Status: discovery and later-phase product work; not the initial MVP's primary build target.

### Distribution customer: organization administrator

- Employer, Islamic professional association, cooperative, university Muslim society, or community organization.
- Needs: a credible financial-wellness or Zakat benefit, co-branded delivery, aggregate engagement reporting, and strong privacy assurances.
- Important distinction: the organization may be the buyer, but individual users retain control of their personal financial data.

## 7. Phase 1 goals and success criteria

### Goals

- Validate Zakat calculation as a recurring, trust-building use case.
- Test whether users are willing to enter and revisit personal financial information.
- Build a credible library of Nigerian Muslim financial education.
- Validate lower-cost acquisition through organizations and communities.
- Generate early revenue without depending on investment commissions.
- Establish evidence and operating maturity for a future licensed advisory product.

### North-star outcome

Users return to Amanah to understand their financial position and meet their Islamic financial obligations with greater confidence.

### Primary metrics

- Completed Zakat calculations, including completion rate from start to result.
- Saved calculations and repeat calculations within a Zakat cycle.
- Zakat anniversary dates configured and reminder opt-in rate.
- Financial Snapshot completion and repeat usage.
- Education guide completion and return rate.
- Organizations signed, activated users per organization, and renewal rate.
- User-reported confidence and trust after completing a core journey.

### Guardrail metrics

- Calculation error or correction rate.
- User reports of confusing or misleading advice.
- Privacy incidents and deletion-request completion.
- Provider-directory complaints or outdated entries.
- Notification opt-out and complaint rate.
- Percentage of users who mistakenly believe Amanah is licensed to recommend investments.

Targets will be set after initial discovery and baseline testing. The team should not invent vanity targets before it has acquisition and completion-rate evidence.

## 8. Phase 1 MVP scope

### 8.1 Onboarding and consent

The MVP must:

- Explain Amanah's purpose in plain language.
- State clearly that Phase 1 does not provide personalized investment advice.
- Explain what data is stored, where it is stored, and why.
- Capture acceptance of the privacy notice and terms before storing sensitive financial data.
- Allow users to use core educational content without supplying personal financial data.

Account creation is a product and technical decision still to be finalized. A production release must not imply cross-device backup when data is only stored locally.

### 8.2 Home dashboard

The dashboard should provide:

- A welcoming overview.
- The latest Financial Snapshot summary.
- The next Zakat check-in or anniversary date.
- Quick access to Zakat, Financial Snapshot, Learn, and Provider Directory.
- Learning progress and relevant reminders.

Use **“current savings plus monthly surplus”** or similarly precise language. Avoid presenting all savings as “available to invest,” because some savings may be reserved for emergencies or obligations.

### 8.3 Zakat calculator

The calculator should support, at minimum:

- Cash on hand.
- Bank balances.
- Gold by weight and purity.
- Silver by weight and purity.
- Business inventory.
- Investments, with clearer asset-type treatment as methodology matures.
- Eligible short-term liabilities, subject to the approved methodology.
- Gold- and silver-based Nisab options.
- A transparent asset breakdown, Nisab threshold, applied rate, and result.
- Saving calculation history.
- Setting a Zakat anniversary date.
- Reminder preferences.
- Explanation of where Zakat may be distributed, without collecting or disbursing funds.

The result must show:

- Input values and valuation assumptions.
- Price source and timestamp where market prices are used.
- Selected Nisab standard.
- The calculation formula.
- Relevant limitations and scholarly differences.
- A route to correct inputs and recalculate.

#### Zakat methodology release gate

The production calculator must not claim that its methodology is reviewed or approved until Amanah has:

- Appointed an identifiable, qualified Shariah reviewer or board.
- Documented the adopted methodology and supported schools/opinions.
- Resolved debt deduction, jewellery, investment, business inventory, lunar-year, and solar-year treatment.
- Established versioning and change control for calculation rules.
- Defined how users are notified when a methodology change affects prior calculations.

### 8.4 Reference metal prices

The product may retrieve indicative gold, silver, and foreign-exchange prices, but production implementation must:

- Use a controlled backend or trusted data provider rather than rely solely on browser calls to free public APIs.
- Validate responses and fail safely.
- Display the provider, timestamp, currency conversion, and whether the rate is indicative.
- Permit an authorized manual override where appropriate.
- Preserve the exact price used with each saved calculation.
- Avoid implying that a wholesale spot price equals a Nigerian retail jeweller's realizable price.

### 8.5 Financial Snapshot

The Financial Snapshot should accept:

- Monthly income.
- Expenses by useful categories.
- Current savings.

It should calculate and display:

- Total expenses.
- Monthly surplus or shortfall.
- Current savings plus monthly surplus or shortfall.
- Historical comparisons and trends.
- General, clearly labelled budgeting education.

The Snapshot must remain descriptive. It must not:

- Label an amount as suitable to invest.
- Recommend a savings percentage based on personal inputs.
- Select or rank financial products.
- Turn user responses into a risk or suitability profile.

### 8.6 Learn

The initial education library should cover:

- Zakat fundamentals.
- Sukuk.
- Halal mutual funds.
- Gold.
- Shariah-screened equities.
- Riba, gharar, and relevant foundational concepts.
- Risk, diversification, inflation, fees, fraud, and provider due diligence.
- Budgeting and emergency funds in the Nigerian context.

Every published guide must have:

- Named content ownership.
- A review status and review date.
- Sources or references appropriate to the claim.
- Separate compliance and Shariah review where relevant.
- A scheduled review cadence.
- Plain-language risk explanations.

Reading progress may be saved. Opening an accordion should not automatically count as completing a guide; completion should reflect a meaningful action or explicit confirmation.

### 8.7 Provider Directory

The directory should contain factual information about relevant providers and instruments, including:

- Legal/provider name.
- Registration category and verification date.
- Shariah governance information where verifiable.
- Products offered and minimums where current and sourced.
- Official website and contact route.
- Date the listing was last checked.
- Clear disclosure of any commercial relationship.

The directory must not:

- Claim that a listing is suitable for a user.
- Rank providers using personal financial inputs.
- Use “best,” “recommended,” or equivalent language without a separately approved methodology and regulatory review.
- Present stale licensing information as current.
- Transfer user data to a provider without explicit, specific consent.

Registration status should be verified through authoritative sources on a defined schedule. Government instruments should not be labelled as providers.

### 8.8 Notifications and accountability

The MVP may support:

- Zakat anniversary reminders.
- User-configured savings check-ins.
- Learning reminders.
- Reminders to update a Financial Snapshot.

Notifications must be opt-in, configurable, and easy to disable. Copy must avoid personalized investment instructions. Saving a preference without an actual notification delivery mechanism must not be presented as an active reminder service.

### 8.9 History, settings, and data control

Users should be able to:

- Review saved Zakat calculations and Financial Snapshots.
- See the methodology and prices associated with historical Zakat results.
- Manage notification preferences.
- Export their data in a readable format.
- Delete specific records or all personal data.
- Understand whether deletion is local, server-side, or both.

## 9. Explicitly out of scope for Phase 1

- Personalized investment suitability assessments.
- Risk-profile questionnaires that generate recommendations.
- Recommended portfolios or asset allocations.
- “You should invest ₦X” outputs derived from user data.
- Product matching, ranking, or personalized provider selection.
- Investment execution, custody, deposits, withdrawals, or wallet balances.
- Commission tied to a personalized recommendation.
- Automated bank-account connections unless separately approved and added to this PRD.
- Zakat collection or beneficiary disbursement.
- Halal stock screening.
- Savings pools for Hajj, weddings, or emergencies.
- International-market launch.

## 10. Core user journeys

### Journey A: calculate and save Zakat

1. User learns what information is required and selects the applicable methodology options.
2. User enters assets and eligible liabilities.
3. Amanah shows market-price sources and valuation assumptions.
4. Amanah calculates zakatable wealth, compares it with Nisab, and explains the result.
5. User reviews the breakdown and saves the calculation.
6. User optionally sets an anniversary date and reminder.

### Journey B: understand monthly finances

1. User enters income, categorized expenses, and current savings.
2. Amanah shows expenses, monthly surplus or shortfall, and the combined snapshot.
3. User saves the snapshot.
4. Returning users compare changes over time without receiving a product recommendation.

### Journey C: learn about an instrument

1. User selects a topic.
2. Amanah explains what it is, how returns arise, relevant Shariah reasoning, fees, and risks.
3. User views references and review status.
4. User may visit the neutral directory but is not matched to a provider.

### Journey D: verify a provider

1. User browses or searches the directory.
2. Amanah shows factual provider and registration information with a verification date.
3. User follows an official external link.
4. Amanah does not transmit personal financial data unless the user separately and explicitly authorizes it.

## 11. UX and content direction

### Desired character

Amanah should feel calm, trustworthy, dignified, contemporary, and financially serious. It should avoid both generic fintech hype and superficial religious decoration.

The current visual direction—deep navy, emerald, restrained gold, parchment, editorial typography, and ledger-inspired details—is a suitable foundation, subject to accessibility testing.

### Content rules

- Use plain English first; plan for relevant Nigerian languages after user research.
- Define Arabic and financial terminology on first use.
- Do not use fear, shame, or religious pressure to drive engagement.
- Separate facts, general education, scholarly differences, and personalized advice.
- State risks alongside benefits.
- Display dates on claims that can become stale.
- Never claim scholarly, legal, regulatory, or compliance approval without evidence.
- Avoid dark patterns, artificial urgency, and misleading return language.

### Accessibility baseline

- Target WCAG 2.2 AA for production interfaces.
- Support dynamic text, screen readers, keyboard navigation where applicable, visible focus states, and sufficient contrast.
- Never encode meaning by colour alone.
- Design for low-cost Android devices, intermittent connectivity, and reduced motion.

## 12. Privacy, security, and data requirements

Financial and religious-practice data should be treated as sensitive even where a legal classification is uncertain.

Production requirements include:

- Data minimization and purpose limitation.
- Encryption in transit and at rest for server-stored data.
- Secure authentication and session management if accounts are introduced.
- No secrets or privileged API credentials in the client application.
- Defined retention periods and deletion workflows.
- Audit logging for administrative access and methodology changes.
- Role-based access for support and internal operations.
- Vendor review for analytics, notifications, hosting, and market-data services.
- Explicit consent before sharing data with an organization, provider, or partner.
- Organization dashboards must use aggregation thresholds and must not expose individual financial records by default.
- An incident-response and user-notification process before public launch.
- Compliance review against applicable Nigerian data-protection requirements before production release.

The standalone HTML prototype's browser storage is acceptable only for demonstration. It is not evidence of production-grade privacy, encryption, backup, authentication, or deletion.

## 13. Regulatory and Shariah boundaries

The working regulatory assumption is that general education, descriptive budgeting, and user-input Zakat calculations can be offered without operating as an investment adviser, while personalized recommendations may trigger Nigerian securities regulation.

This assumption is a planning constraint, not legal advice. Before public launch, qualified Nigerian counsel must review:

- All outputs derived from personal financial data.
- Financial Snapshot wording and budgeting prompts.
- Provider-directory presentation and outbound referrals.
- Monetization and partnership structures.
- Marketing claims and disclaimers.
- Whether any planned feature constitutes advisory, brokerage, distribution, or another regulated activity.
- Current SEC requirements, capital thresholds, registration categories, and transition rules.

Disclaimers do not cure functionality that is advisory in substance. Product behavior must remain within the approved boundary.

Shariah governance must include named accountability, documented methodology, review evidence, version control, conflict-of-interest management, and a process for resolving differences of opinion.

## 14. Business model direction

### Phase 1 candidates

- Paid workshops and structured educational courses.
- Organization-paid access to co-branded or white-labelled Zakat and financial-literacy tools.
- Premium household, multi-asset, and business Zakat tracking after the free calculator proves demand.
- Employer-funded Muslim financial-wellness programs.

All monetization requires legal, tax, privacy, compliance, and Shariah review appropriate to the offering.

### Phase 2 candidates

- Partner distribution fees.
- Licensed advisory subscriptions or fees.
- Curated portfolios or asset-management revenue in a later, separately regulated stage.

Phase 2 economics must be tested against the core segment's likely modest monthly investable surplus. Commission revenue should not be treated as proven until volumes and partner terms are validated.

## 15. Go-to-market direction

### Initial channel priority

1. Islamic professional associations and cooperatives.
2. Employer partnerships.
3. University Muslim societies and alumni communities.
4. Islamic finance events and trusted community groups.
5. Educational content on relevant social and video channels.
6. Referral and ambassador programs with appropriate disclosure and controls.

The goal is trusted distribution with lower acquisition cost, not indiscriminate reach.

### Diaspora discovery

Research UK, US, and Gulf-based Nigerian Muslim communities for family-linked Zakat and financial-planning needs. Do not assume Nigerian product rules, Shariah treatment, licensing, payments, or data practices transfer to another jurisdiction.

## 16. Product roadmap

Roadmap timing is directional and should be governed by release gates, not dates alone.

### Phase 0: validation and governance

- Interview target users and organization buyers.
- Appoint Shariah and compliance reviewers.
- Obtain Nigerian legal advice on the Phase 1 boundary.
- Finalize and document the initial Zakat methodology.
- Test prototype comprehension, trust, accessibility, and willingness to return.
- Define privacy architecture and production platform.

### Phase 1A: trustworthy core MVP

- Onboarding, consent, privacy, and clear product boundary.
- Production Zakat calculator with versioned methodology.
- Financial Snapshot with precise descriptive language.
- Reviewed education library.
- Verified provider directory.
- History, data export, and deletion.
- Real, opt-in Zakat reminders.
- Core analytics and operational monitoring.

### Phase 1B: retention and B2B2C

- Additional Zakat scenarios, including household and business needs where approved.
- Organization onboarding and co-branding.
- Privacy-preserving aggregate organization reporting.
- Financial goals and accountability tools that remain non-advisory.
- Paid education and premium tracking experiments.
- Diaspora discovery prototype.

### Phase 2: licensed advisory, contingent on approval

Release gates:

- Current regulatory requirements independently verified.
- Required capital and funding secured.
- Appropriate SEC registration granted.
- Fidelity bond and required governance in place.
- Algorithms, suitability logic, rebalancing policy, disclosures, and technology independently reviewed where required.
- Licensed operating partners and commercial agreements confirmed.

Only after these gates may Amanah add:

- A Halal Investment Profile.
- Personalized suitability assessments.
- Personalized investment plans.
- Multi-provider recommendations and distribution.

### Phase 3: ecosystem expansion

Potential capabilities include Hajj and emergency savings pools, business Zakat automation, halal stock screening, broader Islamic financial planning, and jurisdiction-specific diaspora products. Each requires a separate product, Shariah, legal, risk, and economic assessment.

## 17. Release gates for public MVP

The MVP is not ready for public release until all of the following are true:

- Phase 1 regulatory boundary is reviewed in writing by qualified counsel.
- Zakat methodology and all related claims are reviewed and documented.
- Privacy notice, terms, consent, export, and deletion flows are complete.
- Threat modelling and proportionate security testing are complete.
- Calculations have automated tests covering normal, boundary, invalid, and regression cases.
- Metal-price failures and stale data fail safely.
- Provider information has authoritative sources and verification dates.
- Content has passed its defined review workflow.
- Accessibility and low-end Android testing are complete.
- Notifications work as described or are removed from release copy.
- Analytics do not capture raw financial inputs unless explicitly justified and consented to.
- Customer support, incident handling, and correction processes exist.

## 18. Open decisions and research questions

### Product

- Is login required for the first public version, or can users begin anonymously and optionally create an account for backup?
- Which one or two journeys define the smallest valuable first release?
- Should “current savings” be included in the main Snapshot headline or displayed separately from monthly surplus?
- Which financial goals can be supported without crossing into personalized advice?
- What level of provider filtering remains neutral and informational?

### Zakat and Shariah

- Which scholarly methodology or selectable methodologies will Amanah support?
- How will personal jewellery, pensions, receivables, debts, shares, funds, Sukuk, business assets, and mixed assets be treated?
- How will lunar and solar-year differences be communicated and calculated?
- What market price represents a defensible local valuation for gold and silver?
- Who has final authority to approve methodology and content changes?

### Legal and compliance

- What exact wording and calculations are permissible in the Financial Snapshot?
- Which provider-directory links, referral models, sponsorships, and commercial arrangements require registration or additional disclosures?
- What current Nigerian licensing and capital requirements would apply to Phase 2?
- What record retention is required for calculations, consent, content versions, and complaints?

### Commercial

- Which organization type has the strongest need, shortest sales cycle, and best trust transfer?
- Will organizations pay per user, per year, per event, or for a white-labelled deployment?
- Which premium Zakat needs are frequent enough to support subscription revenue?
- What retention exists outside the annual Zakat season?

### Technical

- Will the production client be mobile-only, web-first, or both?
- What is the source of truth for market prices and provider verification?
- What offline capabilities are necessary?
- What data must sync across devices?
- What analytics design provides learning without collecting unnecessary sensitive data?

## 19. Decision log

| Date | Decision | Rationale | Status |
|---|---|---|---|
| 16 Jul 2026 | Phase 1 will lead with Zakat, Financial Snapshot, education, and a neutral provider directory. | These features address the clearest market gap and are intended to remain outside personalized investment advice. | Adopted, subject to legal review |
| 16 Jul 2026 | Personalized investment recommendations are excluded from the Phase 1 MVP. | They may constitute regulated robo-advisory activity and require substantial compliance readiness. | Adopted |
| 16 Jul 2026 | Amanah will position itself as a trusted starting point rather than another halal fund marketplace. | Established providers already have stronger licenses, products, and distribution credibility. | Adopted |
| 16 Jul 2026 | B2B2C distribution will be prioritized alongside community-led acquisition. | Trusted organizations may lower acquisition cost and transfer credibility. | Hypothesis to validate |
| 16 Jul 2026 | The current standalone HTML is treated as a concept prototype only. | Its local storage, public API dependencies, and simulated settings are not production infrastructure. | Adopted |

## 20. How to use and maintain this PRD

- Product proposals must identify the user problem, phase, metric, regulatory boundary, privacy impact, and Shariah impact.
- Any feature that uses personal inputs to suggest an action, amount, provider, or product requires explicit legal review before design approval.
- Any religious methodology or compliance claim requires named, documented approval before release.
- Changes to MVP scope must update Sections 8, 9, 16, 17, and the decision log.
- Time-sensitive provider, regulatory, price, and market claims must include a source and verification date in their implementation records.
- The roadmap should be revisited after each material discovery round, pilot, regulatory change, or partnership decision.

## 21. Source material and verification note

This PRD synthesizes:

- `Halal_Financial_App_Revised.docx` — revised business and product concept supplied on 16 July 2026.
- `halal_companion_mvp.html` — interactive Phase 1 concept prototype supplied on 16 July 2026.

The source documents include competitive, regulatory, market-size, fund, licensing, and capital claims that may change or require independent verification. Inclusion in this PRD does not convert those claims into verified facts. Authoritative legal, regulatory, provider, market-data, and Shariah sources must be recorded before the relevant claim is used publicly or relied upon for launch.
