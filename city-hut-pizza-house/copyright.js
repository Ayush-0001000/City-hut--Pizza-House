// --- Site-wide copy prevention (user requested 'no copy' behavior) ---
// Prevent programmatic clipboard copy and common keyboard shortcut (Ctrl/Cmd + C)
document.addEventListener('copy', function (e) {
    e.preventDefault();
});

document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === 'c') {
        e.preventDefault();
    }
});