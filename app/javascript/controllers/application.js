import { Application } from "@hotwired/stimulus"
import "channels"

const application = Application.start()

application.debug = false
window.Stimulus = application

export { application }
