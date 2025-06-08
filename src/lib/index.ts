// place files you want to import through the `$lib` alias in this folder.

import { setMessage, type SuperValidated } from "sveltekit-superforms"

export function setSuperMessage(form: SuperValidated<Record<string, unknown>, unknown, Record<string, unknown>>, msg_type: 'success' | 'error' | 'info' | 'none', msg: string) {
    setMessage(form, JSON.stringify({
        msg_type,
        msg
    }))
}
