function initLibraryFilters() {
  const entries = [...document.querySelectorAll('.entry-item')];
  if (!entries.length) return;
  const total = entries.length;
  let type = 'all', year = 'all', month = null;

  const countEl = document.getElementById('entriesCountText');
  const indicator = document.getElementById('filterIndicator');
  const typeBtns = document.getElementById('contentTypeFilters');
  const timeline = document.getElementById('timelineList');
  const resetBtn = document.getElementById('resetBtn');
  const container = document.querySelector('.entries-items-container');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const yearMap = new Map();
  entries.forEach(el => {
    const d = new Date(el.dataset.date + 'T00:00:00');
    if (!yearMap.has(d.getFullYear())) yearMap.set(d.getFullYear(), new Set());
    yearMap.get(d.getFullYear()).add(d.getMonth());
  });
  const years = [...yearMap.keys()].sort((a, b) => b - a);

  const btn = (cls, dataset, html, disabled) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    Object.entries(dataset).forEach(([k, v]) => b.dataset[k] = v);
    if (disabled) b.disabled = true;
    if (html) b.innerHTML = html;
    return b;
  };

  const apply = () => {
    let visible = 0;
    entries.forEach(el => {
      const d = new Date(el.dataset.date + 'T00:00:00');
      const show = (type === 'all' || el.dataset.type === type) &&
        (year === 'all' || d.getFullYear() === +year) &&
        (month === null || d.getMonth() === month);
      el.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    countEl.textContent = (type === 'all' && year === 'all' && month === null) ? `${total} items` : `${visible} of ${total} items`;
    if (type === 'all' && year === 'all' && month === null) {
      indicator.style.background = 'var(--text-heading)';
      indicator.style.border = '1.5px solid var(--text-heading)';
    } else if (visible === 0) {
      indicator.style.background = 'transparent';
      indicator.style.border = '1.5px solid var(--text-heading)';
    } else {
      const pct = (visible / total) * 100;
      indicator.style.background = `conic-gradient(var(--text-heading) 0% ${pct}%, transparent ${pct}% 100%)`;
      indicator.style.border = '1.5px solid var(--text-heading)';
    }
    container.classList.toggle('no-results', visible === 0);
  };

  const buildTimeline = () => {
    const frag = document.createDocumentFragment();
    frag.appendChild(btn('timeline-year-item filter-btn' + (year === 'all' ? ' selected' : ''), { year: 'all' }, '<span class="filter-btn-text">All Time</span>'));
    years.forEach(y => {
      const sel = year == y;
      frag.appendChild(btn('timeline-year-item filter-btn' + (sel ? ' selected' : ''), { year: y }, `<span class="filter-btn-text">${y}</span>`));
      if (sel) {
        const row = document.createElement('div');
        row.className = 'months-inline-list';
        for (let m = 0; m < 12; m++) {
          const has = yearMap.get(y)?.has(m);
          row.appendChild(btn(`month-btn-inline${has ? ' has-data' : ''}${month === m ? ' selected' : ''}`, { month: m }, `<span class="month-text">${months[m]}</span>`, !has));
        }
        frag.appendChild(row);
      }
    });
    timeline.innerHTML = '';
    timeline.appendChild(frag);
  };

  const refresh = () => {
    typeBtns.querySelectorAll('.type-item').forEach(b => b.classList.toggle('active', b.dataset.type === type));
    buildTimeline();
    apply();
  };

  typeBtns.addEventListener('click', e => {
    const t = e.target.closest('.type-item');
    if (t) { type = t.dataset.type; refresh(); }
  });
  timeline.addEventListener('click', e => {
    const yb = e.target.closest('.timeline-year-item');
    if (yb) { year = year === yb.dataset.year ? 'all' : yb.dataset.year; month = null; refresh(); return; }
    const mb = e.target.closest('.month-btn-inline');
    if (mb && !mb.disabled) { const m = +mb.dataset.month; month = month === m ? null : m; refresh(); }
  });
  resetBtn.addEventListener('click', () => { type = year = 'all'; month = null; refresh(); });
  refresh();
}