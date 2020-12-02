import ConnectionProviderOSC from '../../connectionProviders/ConnectionProviderOSC'

class DeviceProviderBitfocusCompanion extends ConnectionProviderOSC {
  static providerRegistration = {
    id: 'DeviceProviderBitfocusCompanion',
    label: 'Bitfocus Companion',
    manufacturer: 'Bitfocus AS',
    protocol: 'OSC',
    description: 'Bitfocus Companion enables the reasonably priced Elgato Streamdeck to be a professional shotbox surface for an increasing amount of different presentation switchers, video playback software and broadcast equipment.',
    category: 'Control',
    parameters: this.parameters,
    defaults: [null, 12321],
    constructor: DeviceProviderBitfocusCompanion
  }

  providerFunctions = [
    {
      id: 'buttonTrigger',
      label: 'Trigger Button (Down and Up)',
      parameters: [
        {
          inputType: 'numberInput',
          id: 'page',
          label: 'Page',
          required: true,
          placeholder: 'Page',
          invalidText: 'Page Number is invalid, Companion has 99 pages of buttons available to use.',
          min: 1,
          max: 99
        },
        {
          inputType: 'numberInput',
          id: 'button',
          label: 'Button',
          required: true,
          placeholder: 'Button',
          invalidText: 'Button Number is invalid, Companion numbers buttons 1 though 32.',
          min: 1,
          max: 32
        }
      ]
    },
    {
      id: 'buttonDown',
      label: 'Press Button (Down)',
      parameters: [
        {
          inputType: 'numberInput',
          id: 'page',
          label: 'Page',
          required: true,
          placeholder: 'Page',
          invalidText: 'Page Number is invalid, Companion has 99 pages of buttons available to use.',
          min: 1,
          max: 99
        },
        {
          inputType: 'numberInput',
          id: 'button',
          label: 'Button',
          required: true,
          placeholder: 'Button',
          invalidText: 'Button Number is invalid, Companion numbers buttons 1 though 32.',
          min: 1,
          max: 32
        }
      ]
    },
    {
      id: 'buttonUp',
      label: 'Release Button (Up)',
      parameters: [
        {
          inputType: 'numberInput',
          id: 'page',
          label: 'Page',
          required: true,
          placeholder: 'Page',
          invalidText: 'Invalid Page number, Companion has 99 pages of buttons available to use.',
          min: 1,
          max: 99
        },
        {
          inputType: 'numberInput',
          id: 'button',
          label: 'Button',
          required: true,
          placeholder: 'Button',
          invalidText: 'Invalid Button, Companion numbers buttons 1 though 32.',
          min: 1,
          max: 32
        }
      ]
    },
    {
      id: 'buttonText',
      label: 'Set Button Text',
      parameters: [
        {
          inputType: 'numberInput',
          id: 'page',
          label: 'Page',
          required: true,
          placeholder: 'Page',
          invalidText: 'Page Number is invalid, Companion has 99 pages of buttons available to use.',
          min: 1,
          max: 99
        },
        {
          inputType: 'numberInput',
          id: 'button',
          label: 'Button',
          required: true,
          placeholder: 'Button',
          invalidText: 'Button Number is invalid, Companion numbers buttons 1 though 32.',
          min: 1,
          max: 32
        },
        {
          inputType: 'textInput',
          id: 'text',
          label: 'Text',
          required: true,
          placeholder: 'New Label Text',
          tooltip: 'This will replace the current label'
        }
      ]
    }
  ]

  interface = (_action) => {
    switch (_action.providerFunction.id) {
      case 'buttonTrigger': // Trigger Button
        this.connectionProviderInterface({
          address: `/press/bank/${_action.parameters.page}/${_action.parameters.button}`,
          args: []
        })
        break
      case 'buttonDown': // Button Down actions
        this.connectionProviderInterface({
          address: `/press/bank/${_action.parameters.page}/${_action.parameters.button}`,
          args: [{ type: 'i', value: 1 }]
        })
        break
      case 'buttonUp': // Button Up actions
        this.connectionProviderInterface({
          address: `/press/bank/${_action.parameters.page}/${_action.parameters.button}`,
          args: [{ type: 'i', value: 0 }]
        })
        break
      case 'buttonText': // Button Up actions
        this.connectionProviderInterface({
          address: `/style/text/${_action.parameters.page}/${_action.parameters.button}`,
          args: [{ type: 's', value: _action.parameters.text }]
        })
        break
    }
  }
}

export default DeviceProviderBitfocusCompanion
