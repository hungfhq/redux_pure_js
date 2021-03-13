console.log(window.Redux)

const { createStore } = window.Redux

// Setup redux store
// state
// reducer
// store
let initialState = [
  'listening to music'
]
const hobbyListOnStorage = localStorage.getItem('hobby-list')
if (hobbyListOnStorage) {
  initialState = JSON.parse(hobbyListOnStorage)
}
// 
const hobbyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HOBBY': {
      const newList = [...state, action.payload]
      localStorage.setItem('hobby-list', JSON.stringify(newList))
      return newList
    }
  }
  return state
}

const store = createStore(hobbyReducer)
// Render redux hobby list
renderHobbyList = (hobbyList) => {
  if (!Array.isArray(hobbyList) || hobbyList.length === 0) {
    return
  }

  const ulElement = document.querySelector('#hobbyListId')

  if (!ulElement) {
    return
  }

  // reset hobby list
  ulElement.innerHTML = ''

  for (const hobby of hobbyList) {
    const liElement = document.createElement('li')
    liElement.innerHTML = hobby
    ulElement.appendChild(liElement)
  }
}

// render list
const initialHobbyList = store.getState()
renderHobbyList(initialHobbyList)

// handle form submit  
const hobbyFormElement = document.querySelector('#hobbyFormId')

if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId')
    if (!hobbyTextElement) return
    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyTextElement.value
    }
    store.dispatch(action)
    hobbyFormElement.reset()
  }
  hobbyFormElement.addEventListener('submit', handleFormSubmit)
}

store.subscribe(() => {
  console.log('STATE UPDATE:', store.getState())
  const newHobbyList = store.getState()
  renderHobbyList(newHobbyList)
})