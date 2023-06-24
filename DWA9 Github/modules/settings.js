import { settings } from '../src/data.js'

function settingsFunctionality() {

    /**
     *-  function that sets the HTML DOM Style color Property to night theme mode
     * using RGB template.
     */
    function darktheme() {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    }

    /**
     * - function that sets the HTML DOM Style color Property to day theme mode
     * using RGB template.
     */
    function lighttheme() {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    /**
     * - function to check the theme that is already being used by window or device, 
     *   then changing the value of select element in the form to 'night' or 'day'.  
     */

    function checkTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            settings.dataSettingsTheme.value = 'night'
            darktheme()
        } else {
            settings.dataSettingsTheme.value = 'day'
            lighttheme()
        }
    }

    /**
     *  - function that sets the theme of window based on the option selected
     *    on the form whenever the settings save button is clicked to submit.
     */
    function setTheme() {
        settings.dataSettingsForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const formData = new FormData(event.target)
            const { theme } = Object.fromEntries(formData)

            if (theme === 'night') {
                darktheme()
            } else {
                lighttheme()
            }
            settings.dataSettingsOverlay.open = false
        })
    }

    // button to display the settings overlay
    settings.dataSettingsCancel.addEventListener('click', () => {
        settings.dataSettingsOverlay.open = false
    })

    // button to close the settings overlay
    settings.dataHeaderSettings.addEventListener('click', () => {
        settings.dataSettingsOverlay.open = true
    })

    //return
    checkTheme()
    setTheme()
}

settingsFunctionality()