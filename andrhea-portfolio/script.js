// Mobile navigation and project preview.
const toggle=document.querySelector('#menu-toggle');
const nav=document.querySelector('#primary-nav');
function closeMenu(){nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open menu');}
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
// If photos have not yet been uploaded to GitHub, keep styled placeholders visible.
document.querySelectorAll('.asset-image').forEach(img=>{function done(){img.classList.toggle('loaded',img.naturalWidth>0);}
  img.addEventListener('load',done);img.addEventListener('error',done);if(img.complete)done();
});
const modal=document.querySelector('#brochure-dialog');
const brochureButton=document.querySelector('#open-brochure');
const brochureImg=document.querySelector('.brochure-img');
function setBrochureButtonState(){
  const ready=Boolean(brochureImg?.naturalWidth);
  if (brochureButton) {
    brochureButton.disabled=!ready;
    brochureButton.title=ready?'View brochure in full size':'Brochure image will be available after upload';
  }
}
brochureImg?.addEventListener('load',setBrochureButtonState);
brochureImg?.addEventListener('error',setBrochureButtonState);
setBrochureButtonState();
brochureButton?.addEventListener('click',()=>{if(brochureImg?.naturalWidth && modal?.showModal)modal.showModal();});
document.querySelector('#close-brochure')?.addEventListener('click',()=>modal.close());
modal?.addEventListener('click',e=>{if(e.target===modal)modal.close();});
