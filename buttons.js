document.querySelectorAll('.btn').forEach(btn => {
  if (!btn.closest('.menu-group')) {
    btn.addEventListener('click', () => btn.classList.add('clicked'));
  }
});
