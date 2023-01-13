const colors_array = JSON.parse(localStorage.getItem('colors') || '[]')
  
  const wrapper = 
  document.querySelector('.wrapper')
  
const SearchInput = 
document.querySelector('#searchInput')


const openContainer = 
document.querySelector('#openContainer');

const close_full_view = 
document.querySelector('.full_view_container .close')
const full_view_container = 
document.querySelector('.full_view_container')
const colorName = 
document.querySelector('.full_view_container .colorName')
const full_view_box_color =
document.querySelector('.full_view_container .color')


const container = 
document.querySelector('.new_container')

const inputColor = 
document.querySelectorAll('.inputs_  input')

const copyColor = 
document.querySelectorAll('.inputs_  button')

const allInputColor = 
document.querySelectorAll('.enterColor label input')

const previewEnterColor = 
document.querySelector('.previewColor')

const cancel = 
document.querySelector('.new_container .cancel')

 function savedCount()
 {
   if (colors_array == null) {
     document.querySelector('#savedCount').innerHTML = '0 saved colors'
   } else {
     document.querySelector('#savedCount').innerHTML = `${colors_array.length} saved color(s)`
   }
 }


savedCount()

const enter = 
document.querySelector('.new_container .enter')

allInputColor[0].addEventListener('keyup',function(){
  previewEnterColor.style.backgroundColor = `${this.value}`
})


cancel.addEventListener('click',()=>{
  container.style.display = 'none'
})

openContainer.addEventListener('click',()=>{
  container.style.display = 'block'
})





function addNew()
{
  
  if (allInputColor[0].value == '') {
     document.querySelector('#error').textContent = 'Hex color is required'
    setTimeout(()=>{
      document.querySelector('#error').textContent = ''
    },2000)
    return;
  }else if (allInputColor[0].value.length < 3){
     document.querySelector('#error').textContent = 'value to short'
    setTimeout(()=>{
      document.querySelector('#error').textContent = ''
    },2000)
    return;
  }else if (allInputColor[0].value.length > 7){
    document.querySelector('#error').textContent = 'value to long'
    setTimeout(() => {
      document.querySelector('#error').textContent = ''
    }, 2000)
    return;
  }else if (!allInputColor[0].value.includes('#')){
     document.querySelector('#error').textContent = 'missing the "#" symbol'
     setTimeout(() => {
       document.querySelector('#error').textContent = ''
     }, 2000)
     return;
  }else {
  
  SavedColors(allInputColor[3].value,allInputColor[0].value,allInputColor[1].value,allInputColor[2].value)
    }
}

enter.onclick = addNew


function SavedColors(colorName,hexColor,rgbColor,rgbaColor)
{

colors_array.push({
  
    color_name: colorName,
    color_hex: hexColor,
    color_rgb: rgbColor,
    color_css: rgbaColor
});

localStorage.setItem('colors',JSON.stringify(colors_array))
  container.style.display = 'none'
  showCardColor()
  savedCount()
  allInputColor[0].value = ''
  allInputColor[1].value = ''
  allInputColor[2].value = ''
  allInputColor[3].value = ''
  previewEnterColor.style.backgroundColor = ''

}

function showCardColor()
{
  let innerCard = ''
  for (var i = 0; i < colors_array.length; i++) {
    let newCard = `
  <div class="card_color" data-color="${colors_array[i].color_name} ${colors_array[i].color_hex}">
    <button class="delete material-symbols-outlined">
           delete
      </button>
    <div class="color" style="background-color: ${colors_array[i].color_hex}"  >
           
         </div> 
         <p>${colors_array[i].color_name}</p>
        </div>
    `
    innerCard += newCard
  }
  
  wrapper.innerHTML = innerCard
  
  const allCards = Array.from(document.querySelectorAll('.card_color'))
  
  allCards.forEach(card => {
    card.addEventListener('click',function(){
 fullScreenCard(colors_array[allCards.indexOf(this)].color_hex,colors_array[allCards.indexOf(this)].color_rgb,colors_array[allCards.indexOf(this)].color_css,colors_array[allCards.indexOf(this)].color_name)
    })
  })
  






  SearchInput.addEventListener('keyup', () => {
   if (SearchInput.value.length == 0) {
     showCardColor()
   }
 const searchValue = SearchInput.value.toLowerCase();
 
 for (const box of allCards) {
     if (box.dataset.color.toLowerCase().includes(searchValue)) {
       box.classList.remove('active')
    } else {
      box.classList.add('active')
    }
   }
   
   
 });

  
const allDeletebtns = 
Array.from(document.querySelectorAll('.delete'))

allDeletebtns.forEach(delete_button =>{
  delete_button.addEventListener('click',function(e){
    e.stopPropagation()
    e.stopImmediatePropagation()
    e.preventDefault()
    
    if (confirm('remove color card ?')) {
      colors_array.splice(allDeletebtns.indexOf(this),1)
  
  localStorage.setItem('colors',JSON.stringify(colors_array))
      
      showCardColor()
      savedCount()
    }
    
  })
})

  


}






showCardColor()



function fullScreenCard(hex_color,rgb_color, css_color,name_color)
{
  colorName.innerHTML = name_color
  full_view_box_color.style.backgroundColor = `${hex_color}`
  inputColor[0].value = hex_color;
  inputColor[1].value = rgb_color;
  inputColor[2].value = css_color
  full_view_container.classList.add('showUp')
}

close_full_view.addEventListener('click',()=>{
    full_view_container.classList.remove('showUp')
})


copyColor[0].addEventListener('click',()=>{
  if (navigator.clipboard) {
    inputColor[0].select()
 navigator.clipboard.writeText(inputColor[0].value)
 .then(()=>{
   copyColor[0].innerHTML = 'check'
   setTimeout(()=>{
   copyColor[0].innerHTML = 'content_copy'
   },1000)
 })
.catch(err =>{
  alert('Failed to copy text',err)
})
 
  }else {
    inputColor[0].select()
    document.execCommand('copy')
    copyColor[0].innerHTML = 'check'
   setTimeout(()=>{
   copyColor[0].innerHTML = 'content_copy'
   },1000)
  }
  
  

})

copyColor[1].addEventListener('click',()=>{
  if (navigator.clipboard) {
    inputColor[1].select()
 navigator.clipboard.writeText(inputColor[1].value)
 .then(()=>{
   copyColor[1].innerHTML = 'check'
   setTimeout(()=>{
   copyColor[1].innerHTML = 'content_copy'
   },1000)
 })
.catch(err =>{
  alert('Failed to copy text',err)
})
 
  }else {
    inputColor[1].select()
    document.execCommand('copy')
    copyColor[1].innerHTML = 'check'
   setTimeout(()=>{
   copyColor[1].innerHTML = 'content_copy'
   },1000)
  }
  
  
})

copyColor[2].addEventListener('click', () => {
  if (navigator.clipboard) {
    inputColor[2].select()
 navigator.clipboard.writeText(inputColor[2].value)
 .then(()=>{
   copyColor[2].innerHTML = 'check'
   setTimeout(()=>{
   copyColor[2].innerHTML = 'content_copy'
   },1000)
 })
.catch(err =>{
  alert('Failed to copy text',err)
})
 
  }else {
    inputColor[2].select()
    document.execCommand('copy')
    copyColor[2].innerHTML = 'check'
   setTimeout(()=>{
   copyColor[2].innerHTML = 'content_copy'
   },1000)
  }
  
  
})


