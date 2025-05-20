function loadHTML(selector, url) {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        document.querySelector(selector).innerHTML = data;
      });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    loadHTML('#header', 'header.html');
    loadHTML('#footer', 'footer.html');
    
  });
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const slides = carousel.querySelector('.carousel-slides');
    const btnNext = carousel.querySelector('.carousel-btn.next');
    const btnPrev = carousel.querySelector('.carousel-btn.prev');
    const total = slides.children.length;
    let index = 0;

    function update() {
      slides.style.transform = `translateX(-${index * 100}%)`;
    }

    btnNext.addEventListener('click', () => {
      index = (index + 1) % total;
      update();
    });

    btnPrev.addEventListener('click', () => {
      index = (index - 1 + total) % total;
      update();
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const imgEl = document.getElementById('slider-img');
  const btnNext = document.getElementById('next');
  const btnPrev = document.getElementById('prev');
  if (!imgEl || !btnNext || !btnPrev) return;  // 元素不存在就跳過

  let index = 1;
  const total = 15;
  btnNext.addEventListener('click', () => {
    index = index < total ? index + 1 : 1;
    imgEl.src = `image/傳承/傳承${index}.jpg`;
  });
  btnPrev.addEventListener('click', () => {
    index = index > 1 ? index - 1 : total;
    imgEl.src = `image/傳承/傳承${index}.jpg`;
  });
});

