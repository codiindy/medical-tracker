import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AddMeasurementModal from '../src/components/AddMeasurementModal.vue'

const global = {
  stubs: {
    BaseModal: {
      template: `<div><slot/><slot name="footer"/></div>`
    }
  }
}

describe('AddMeasurementModal', () => {
  it('emits save with valid values', async () => {
    const wrapper = mount(AddMeasurementModal, {
      props: { modelValue: true },
      global
    })

    await wrapper.find('#sys').setValue('120')
    await wrapper.find('#dia').setValue('80')
    await wrapper.find('#bpm').setValue('70')

    // Btn footer
    const buttons = wrapper.findAll('button')
    const saveBtn = buttons.find(b => /save/i.test(b.text()))!
    await saveBtn.trigger('click')

    const emits = wrapper.emitted('save') as any[]
    expect(emits?.length).toBe(1)
    expect(emits[0][0]).toEqual({ sys: 120, dia: 80, bpm: 70 })
  })

  it('shows validation errors for out-of-range values', async () => {
    const wrapper = mount(AddMeasurementModal, {
      props: { modelValue: true },
      global
    })

    await wrapper.find('#sys').setValue('20')
    await wrapper.find('#dia').setValue('10')
    await wrapper.find('#bpm').setValue('10')

    const saveBtn = wrapper.findAll('button').find(b => /save/i.test(b.text()))!
    await saveBtn.trigger('click')

    expect(wrapper.text()).toMatch(/Enter a value between 60 and 260/i)
    expect(wrapper.text()).toMatch(/Enter a value between 40 and 160/i)
    expect(wrapper.text()).toMatch(/Enter a value between 20 and 220/i)
  })
})
