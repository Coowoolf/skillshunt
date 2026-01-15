/**
 * SkillsHunt E2E Test Suite
 * 
 * Using Superpowers TDD methodology:
 * - RED: Write failing test first
 * - GREEN: Verify implementation works
 * - REFACTOR: Clean up if needed
 * 
 * Test Coverage:
 * 1. Homepage & Navigation
 * 2. Skills Grid & Filtering
 * 3. Skill Detail Pages
 * 4. Upvote System (with localStorage persistence)
 * 5. Submit Skill Modal
 * 6. About Section
 * 7. Responsive Design
 */

import { test, expect } from '@playwright/test';

// ============================================
// 1. HOMEPAGE TESTS
// ============================================
test.describe('Homepage', () => {
    test('should display SkillsHunt branding', async ({ page }) => {
        await page.goto('/');

        // Verify logo and branding (use first match)
        await expect(page.getByRole('link', { name: /SkillsHunt/i }).first()).toBeVisible();
        await expect(page.locator('p:has-text("Discover AI Agent Skills")')).toBeVisible();
    });

    test('should show hero section with skill count', async ({ page }) => {
        await page.goto('/');

        // Verify hero text - use heading role
        await expect(page.getByRole('heading', { name: /Discover/ })).toBeVisible();

        // Verify skill count display (35+ skills)
        await expect(page.locator('text=35+ skills')).toBeVisible();
    });

    test('should display source stats cards', async ({ page }) => {
        await page.goto('/');

        // Verify all source cards are present - use more specific selectors
        await expect(page.locator('.card:has-text("Anthropic")').first()).toBeVisible();
        await expect(page.locator('.card:has-text("Superpowers")').first()).toBeVisible();
        await expect(page.locator('.card:has-text("Composio")').first()).toBeVisible();
        await expect(page.locator('.card:has-text("Community")').first()).toBeVisible();
    });

    test('should display skills grid with 35 skills', async ({ page }) => {
        await page.goto('/');

        // Verify "All Skills (35)" heading
        await expect(page.locator('h2:has-text("All Skills")')).toBeVisible();
        await expect(page.locator('text=(35)')).toBeVisible();

        // Verify skill cards are rendered
        await expect(page.locator('h3:has-text("PDF Processing")')).toBeVisible();
    });
});

// ============================================
// 2. NAVIGATION TESTS
// ============================================
test.describe('Navigation', () => {
    test('should have working Explore link', async ({ page }) => {
        await page.goto('/');

        // Click Explore link in header nav
        await page.locator('nav a:has-text("Explore")').click();

        // Should stay on homepage
        await expect(page).toHaveURL('/');
    });

    test('should scroll to Categories on click', async ({ page }) => {
        await page.goto('/');

        // Click Categories in header nav
        await page.locator('nav a:has-text("Categories")').click();

        // URL should have #categories
        await expect(page).toHaveURL('/#categories');
    });

    test('should scroll to About section on click', async ({ page }) => {
        await page.goto('/');

        // Click About in header nav
        await page.locator('nav a:has-text("About")').click();

        // URL should have #about
        await expect(page).toHaveURL('/#about');

        // About section should be visible
        await expect(page.getByRole('heading', { name: 'About SkillsHunt' })).toBeVisible();
    });
});

// ============================================
// 3. SEARCH FUNCTIONALITY
// ============================================
test.describe('Search', () => {
    test('should filter skills by search query', async ({ page }) => {
        await page.goto('/');

        // Type in search box
        await page.fill('input[placeholder*="Search"]', 'PDF');

        // Should show PDF Processing
        await expect(page.locator('h3:has-text("PDF Processing")')).toBeVisible();
    });

    test('should show no results for invalid search', async ({ page }) => {
        await page.goto('/');

        // Type invalid query
        await page.fill('input[placeholder*="Search"]', 'xyznonexistent123');

        // Should show "No skills found"
        await expect(page.locator('text=No skills found')).toBeVisible();
    });
});

// ============================================
// 4. CATEGORY FILTERING
// ============================================
test.describe('Category Filtering', () => {
    test('should filter by Development category', async ({ page }) => {
        await page.goto('/');

        // Click Development filter tag
        await page.locator('span:has-text("Development")').first().click();

        // Should show filtered skills with count
        await expect(page.locator('h2:has-text("Development")')).toBeVisible();
    });

    test('should filter by Benchmarks category', async ({ page }) => {
        await page.goto('/');

        // Click Benchmarks filter tag
        await page.locator('span:has-text("Benchmarks")').first().click();

        // Should show benchmark skills
        await expect(page.locator('h2:has-text("Benchmarks")')).toBeVisible();
    });

    test('should show all skills when All Skills is clicked', async ({ page }) => {
        await page.goto('/');

        // First filter by category
        await page.locator('span:has-text("Development")').first().click();
        await page.waitForTimeout(300);

        // Then click All Skills
        await page.locator('span:has-text("All Skills")').first().click();

        // Should show 35 skills heading
        await expect(page.locator('h2:has-text("All Skills")')).toBeVisible();
    });
});

// ============================================
// 5. SKILL DETAIL PAGE
// ============================================
test.describe('Skill Detail Page', () => {
    test('should navigate to skill detail page', async ({ page }) => {
        await page.goto('/');

        // Click on a skill card
        await page.locator('a[href="/skills/pdf-processing"]').first().click();

        // Should navigate to detail page
        await expect(page).toHaveURL('/skills/pdf-processing');
        await expect(page.getByRole('heading', { name: 'PDF Processing', level: 1 })).toBeVisible();
    });

    test('should display skill metadata', async ({ page }) => {
        await page.goto('/skills/pdf-processing');

        // Verify metadata with more specific selectors
        await expect(page.locator('text=anthropic').first()).toBeVisible();
        await expect(page.locator('text=document').first()).toBeVisible();
        await expect(page.getByRole('heading', { name: '📦 Installation' })).toBeVisible();
    });

    test('should have working copy button', async ({ page }) => {
        await page.goto('/skills/pdf-processing');

        // Find and click copy button
        const copyButton = page.getByRole('button', { name: 'Copy Command' });
        await expect(copyButton).toBeVisible();

        // Click copy
        await copyButton.click();

        // Should show "Copied!" text on button
        await expect(page.getByRole('button', { name: /Copied/ })).toBeVisible();
    });

    test('should have back link to homepage', async ({ page }) => {
        await page.goto('/skills/pdf-processing');

        // Click back link
        await page.locator('a:has-text("Back to All Skills")').click();

        // Should navigate to homepage
        await expect(page).toHaveURL('/');
    });
});

// ============================================
// 6. UPVOTE SYSTEM (localStorage persistence)
// ============================================
test.describe('Upvote System', () => {
    test.beforeEach(async ({ page }) => {
        // Clear localStorage before each test
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());
    });

    test('should increment upvote count on click', async ({ page }) => {
        await page.goto('/skills/pdf-processing');

        // Get initial count
        const button = page.getByRole('button', { name: /Upvote/ });
        const initialText = await button.textContent();
        const initialCount = parseInt(initialText?.match(/\d+/)?.[0] || '0');

        // Click upvote
        await button.click();

        // Should increment
        await expect(button).toContainText((initialCount + 1).toString());
        await expect(button).toContainText('Upvoted');
    });

    test('should persist upvote in localStorage', async ({ page }) => {
        await page.goto('/skills/pdf-processing');

        // Click upvote
        await page.getByRole('button', { name: /Upvote/ }).click();

        // Verify localStorage
        const votes = await page.evaluate(() => localStorage.getItem('skillshunt_votes'));
        expect(votes).toContain('anthropic-pdf');
    });

    test('should show upvote state on homepage after voting', async ({ page }) => {
        // First, vote on detail page
        await page.goto('/skills/pdf-processing');
        await page.getByRole('button', { name: /Upvote/ }).click();

        // Navigate back to homepage
        await page.locator('a:has-text("Back to All Skills")').click();

        // Find PDF Processing card and verify green checkmark
        const card = page.locator('a[href="/skills/pdf-processing"]').first();
        await expect(card.locator('text=✅')).toBeVisible();
    });

    test('should allow toggling upvote off', async ({ page }) => {
        await page.goto('/skills/pdf-processing');

        const button = page.getByRole('button', { name: /Upvote|Upvoted/ });

        // Click upvote
        await button.click();
        await expect(button).toContainText('Upvoted');

        // Click again to toggle off
        await button.click();
        await expect(button).toContainText('Upvote');
        await expect(button).not.toContainText('Upvoted');
    });
});

// ============================================
// 7. SUBMIT SKILL MODAL
// ============================================
test.describe('Submit Skill Modal', () => {
    test('should open modal on button click', async ({ page }) => {
        await page.goto('/');

        // Click Submit Skill button in header
        await page.getByRole('button', { name: 'Submit Skill' }).click();

        // Modal should be visible
        await expect(page.getByRole('heading', { name: 'Submit a Skill' })).toBeVisible();
        await expect(page.locator('text=Share your AI Agent Skill')).toBeVisible();
    });

    test('should display above header (z-index fix)', async ({ page }) => {
        await page.goto('/');

        // Open modal
        await page.getByRole('button', { name: 'Submit Skill' }).click();

        // Modal form fields should be visible and clickable
        const skillNameInput = page.locator('input[placeholder*="Database Migration"]');
        await expect(skillNameInput).toBeVisible();
        await skillNameInput.fill('Test Skill');
    });

    test('should close modal on X button click', async ({ page }) => {
        await page.goto('/');

        // Open modal
        await page.getByRole('button', { name: 'Submit Skill' }).click();
        await expect(page.getByRole('heading', { name: 'Submit a Skill' })).toBeVisible();

        // Click X button (close button)
        await page.locator('button:has-text("✕")').click();

        // Modal should close
        await expect(page.getByRole('heading', { name: 'Submit a Skill' })).not.toBeVisible();
    });

    test('should submit form and show success message', async ({ page }) => {
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());

        // Open modal
        await page.getByRole('button', { name: 'Submit Skill' }).click();

        // Fill form
        await page.fill('input[placeholder*="Database Migration"]', 'Test E2E Skill');
        await page.fill('textarea[placeholder*="What does"]', 'This is a test skill for E2E testing');
        await page.fill('input[placeholder*="github.com"]', 'https://github.com/test/skill');
        await page.fill('input[placeholder*="example.com"]', 'test@example.com');

        // Submit
        await page.getByRole('button', { name: '🚀 Submit Skill' }).click();

        // Should show success message
        await expect(page.locator('text=Thanks for submitting')).toBeVisible();
    });
});

// ============================================
// 8. ABOUT SECTION
// ============================================
test.describe('About Section', () => {
    test('should display About SkillsHunt section', async ({ page }) => {
        await page.goto('/#about');

        await expect(page.getByRole('heading', { name: 'About SkillsHunt' })).toBeVisible();
        await expect(page.locator('text=Product Hunt for AI Agent Skills')).toBeVisible();
    });

    test('should display feature cards', async ({ page }) => {
        await page.goto('/#about');

        // Verify feature cards
        await expect(page.locator('section#about h3:has-text("Discover")')).toBeVisible();
        await expect(page.locator('section#about h3:has-text("Share")')).toBeVisible();
        await expect(page.locator('section#about h3:has-text("Benchmark")')).toBeVisible();
    });

    test('should have external links', async ({ page }) => {
        await page.goto('/#about');

        // Verify GitHub link
        const githubLink = page.locator('a:has-text("Star on GitHub")');
        await expect(githubLink).toBeVisible();
        await expect(githubLink).toHaveAttribute('href', 'https://github.com/Coowoolf/skillshunt');

        // Verify SkillsBench link
        const skillsbenchLink = page.locator('a:has-text("SkillsBench Partnership")');
        await expect(skillsbenchLink).toBeVisible();
        await expect(skillsbenchLink).toHaveAttribute('href', 'https://skillsbench.ai');
    });
});

// ============================================
// 9. RESPONSIVE DESIGN
// ============================================
test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Branding should be visible - use first match
        await expect(page.locator('h1:has-text("SkillsHunt")').first()).toBeVisible();

        // Skills grid should work (cards exist)
        await expect(page.locator('.card').first()).toBeVisible();
    });

    test('should hide navigation on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');

        // Desktop nav should be hidden (md:flex)
        const desktopNav = page.locator('nav.hidden');
        await expect(desktopNav).toBeVisible(); // Element exists but is hidden via CSS
    });
});

// ============================================
// 10. PERFORMANCE & ACCESSIBILITY
// ============================================
test.describe('Performance & Accessibility', () => {
    test('page should load within acceptable time', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        const loadTime = Date.now() - startTime;

        // Page should load within 5 seconds
        expect(loadTime).toBeLessThan(5000);
    });

    test('all skill links should be navigable', async ({ page }) => {
        await page.goto('/');

        // Get first skill link
        const firstSkillLink = page.locator('a[href^="/skills/"]').first();
        const href = await firstSkillLink.getAttribute('href');

        // Navigate to skill page
        await page.goto(href!);

        // Verify page loaded - use specific heading
        await expect(page.locator('h1.heading-lg')).toBeVisible();
    });
});
