// Skills Tab Functionality (robust, accessible)
document.addEventListener('DOMContentLoaded', () => {
    const tabsContainer = document.querySelector('.skills-tabs');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabsContainer) return; // nothing to do

    // Helper to activate a tab by button element
    function activateTab(button) {
        const targetId = button && button.dataset && button.dataset.tab;
        if (!targetId) return;

        // deactivate all
        tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
            btn.setAttribute('tabindex', '-1');
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('hidden', '');
        });

        // activate requested
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            button.removeAttribute('tabindex');
            targetContent.classList.add('active');
            targetContent.removeAttribute('hidden');
        }
    }

    // Click (event delegation)
    tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        e.preventDefault();
        activateTab(btn);
    });

    // Keyboard support: Left/Right arrow to switch, Home/End
    tabsContainer.addEventListener('keydown', (e) => {
        const current = document.activeElement.closest && document.activeElement.closest('.tab-btn') ? document.activeElement : null;
        const buttons = Array.from(tabsContainer.querySelectorAll('.tab-btn'));
        if (!buttons.length) return;

        let idx = current ? buttons.indexOf(current) : buttons.findIndex(b => b.classList.contains('active'));
        if (idx === -1) idx = 0;

        switch (e.key) {
            case 'ArrowRight':
                e.preventDefault();
                idx = (idx + 1) % buttons.length;
                buttons[idx].focus();
                activateTab(buttons[idx]);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                idx = (idx - 1 + buttons.length) % buttons.length;
                buttons[idx].focus();
                activateTab(buttons[idx]);
                break;
            case 'Home':
                e.preventDefault();
                buttons[0].focus();
                activateTab(buttons[0]);
                break;
            case 'End':
                e.preventDefault();
                buttons[buttons.length - 1].focus();
                activateTab(buttons[buttons.length - 1]);
                break;
            case 'Enter':
            case ' ': // space
                if (current) {
                    e.preventDefault();
                    activateTab(current);
                }
                break;
            default:
                break;
        }
    });

    // Initialize: ensure only active content is visible
    const activeBtn = tabsContainer.querySelector('.tab-btn.active') || tabsContainer.querySelector('.tab-btn');
    activateTab(activeBtn);
});