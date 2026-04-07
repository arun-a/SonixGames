document.addEventListener("DOMContentLoaded", function () {
    const circle = document.getElementById('circle-progress');
    const valueEl = document.getElementById('circle-value');
    if (!circle || !valueEl) return;

    const duration = 500; // 0.5s
    const startTime = performance.now();

    function animate(time) {
        const elapsed = Math.min(duration, time - startTime);
        const progress = elapsed / duration;
        const percent = Math.round(progress * 100);

        circle.style.setProperty('--progress-angle', `${percent * 3.6}deg`);
        valueEl.textContent = `${percent}%`;

        if (elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            circle.style.setProperty('--progress-angle', '360deg');
            valueEl.textContent = '100%';
        }
    }

    requestAnimationFrame(animate);
});
