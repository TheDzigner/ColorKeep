const my_palettes = 
JSON.parse(localStorage.getItem('my_palettes') || '[]')


const SearchInput = 
document.querySelector('#SearchInput')

const reload = 
document.querySelector('.reload');
const container = 
document.querySelector('.wrapper')

SearchInput.addEventListener('keyup',function(){
  if (SearchInput.value.trim().length == 0) {
    randomColor()
   document.querySelector('.results_count').innerHTML = 'Showing random Colors'
   return;
    }
    
  loadColor()
})



async function loadColor(arg) {
  const results = 
  await fetch(`https://www.colr.org/json/tags/${SearchInput.value.trim()}`)
  const data = await results.json()
  document.querySelector('.results_count').textContent = `Showing ${data.colors.length} result(s) for "${SearchInput.value}"`
  showColor(data)
  
}



function showColor(data)
{
  let innerNew = ''
  for (var color in data.colors) {
    let newColor = `
    <div class="card">
    <button class="save material-symbols-outlined">
      bookmark
    </button>
        <div class="color_preview" style="background-color:#${data.colors[color].hex}"></div>
        <p>#${data.colors[color].hex}</p>
      </div>  
    `
    innerNew += newColor
  }
  container.innerHTML = innerNew
  
  const allBookmarks = Array.from(document.querySelectorAll('.save'))
  
  allBookmarks.forEach(bookmark_btn =>{
    bookmark_btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation()
      
      my_palettes.push({
        color_hex: `#${data.colors[allBookmarks.indexOf(this)].hex}`
      })
      
      localStorage.setItem('my_palettes',JSON.stringify(my_palettes))
      
    })
  })
  
  
}



async function randomColor() {
  const fectchUrl = await fetch('https://www.colr.org/json/colors/random/30')
  const dataUrl = await fectchUrl.json()
showRandomColor(dataUrl)
}

randomColor()

reload.addEventListener('click',function(){
  randomColor()
})

function showRandomColor(dataUrl)
{
 document.querySelector('.results_count').innerHTML = 'Showing random Colors'
  let innerNew = ''
  for (var color in dataUrl.colors) {
    let newColor = `
    <div class="card">
    <button class="save material-symbols-outlined">
      bookmark
    </button>
        <div class="color_preview" style="background-color:#${dataUrl.colors[color].hex}"></div>
        <p>#${dataUrl.colors[color].hex}</p>
      </div>  
    `
    innerNew += newColor
  }
  container.innerHTML = innerNew
  
  const allBookmarks = Array.from(document.querySelectorAll('.save'))
  
  allBookmarks.forEach(bookmark_btn =>{
    bookmark_btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation()
      
      my_palettes.push({
        color_hex: `#${dataUrl.colors[allBookmarks.indexOf(this)].hex}`
      })
      
      localStorage.setItem('my_palettes',JSON.stringify(my_palettes))
      
    })
  })
  
  
  
}


const home = 
document.querySelector('.home')

home.addEventListener('click',()=>{
  window.location.replace('/index.html')
})

