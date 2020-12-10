  //EJEMPLO https://github.com/JoseJPR/tutorial-pwa-add-home-screen
  
  // Declare general function to change status prompt
  const promptToggle = (element, toAdd, toRemove) => {
    element.classList.add(toAdd);
    element.classList.remove(toRemove);
  };
  
  // Declare general function to get or set status into storage
  const statusPrompt = {
    get: () => {
      return localStorage.getItem('statusPrompt') || null;
    },
    set: (status) => {
      localStorage.setItem('statusPrompt', status);
      return;
    }
  }
  
  window.onload = (e) => { 
  // Declare init HTML elements
  const prompt = document.querySelector('#prompt');
  const buttonAdd = document.querySelector('#buttonAdd');
  const buttonCancel = document.querySelector('#buttonCancel');
  
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Show prompt modal if user previously not set to dismissed or accepted
    if(!statusPrompt.get()) {
      // Change status prompt
      promptToggle(prompt, 'show', 'hide');
    }
  });
  
  // Add event click function for Cancel button
  buttonCancel.addEventListener('click', (e) => {
    // Change status prompt
    promptToggle(prompt, 'hide', 'show');
    // Set status prompt to dismissed
    statusPrompt.set('dismissed');
  });
  
  // Add event click function for Add button
  buttonAdd.addEventListener('click', (e) => {
    // Change status prompt
    promptToggle(prompt, 'hide', 'show');
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          statusPrompt.set('accepted');
          console.log('Userio aceptó la instalación');
        } else {
          statusPrompt.set('dismissed');
          console.log('User canceló la instalación');
        }
        deferredPrompt = null;
      });
  });
  }

//Google https://web.dev/codelab-make-installable/
window.addEventListener('appinstalled', (evt) => {
  // Log install to analytics
  console.log('INSTALL: Success');
});

window.addEventListener('DOMContentLoaded', () => {
  let displayMode = 'browser tab';
  if (navigator.standalone) {
    displayMode = 'standalone-ios';
  }
  if (window.matchMedia('(display-mode: standalone)').matches) {
    displayMode = 'standalone';
  }
  // Log launch display mode to analytics
  console.log('DISPLAY_MODE_LAUNCH:', displayMode);
});

window.addEventListener('DOMContentLoaded', () => {
  window.matchMedia('(display-mode: standalone)').addListener((evt) => {
    let displayMode = 'browser tab';
    if (evt.matches) {
      displayMode = 'standalone';
    }
    // Log display mode change to analytics
    console.log('DISPLAY_MODE_CHANGED', displayMode);
  });
});