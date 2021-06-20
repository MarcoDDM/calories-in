import { useUndoRedoMethods } from 'core/undoRedo'
import { useFieldArray, UseFormReturn, useWatch } from 'react-hook-form'
import { DietForm } from './dietForm'
import { getVariantsFormsPath, VariantField, VariantForm } from './variantForm'

type Params = {
  formMethods: UseFormReturn<DietForm>
}

function useVariantsFieldArray({ formMethods }: Params) {
  const { setValue, control } = formMethods
  const { saveLastChange } = useUndoRedoMethods()
  const selectedVariantFormIndex =
    useWatch({
      name: 'selectedVariantFormIndex',
      control,
    }) || 0

  const {
    fields,
    append: appendVariantForm,
    remove: removeVariantForm,
    move: moveVariantForm,
  } = useFieldArray({
    name: getVariantsFormsPath() as any,
    control,
  })

  function onAppendVariantForm(variantForm: VariantForm) {
    appendVariantForm(variantForm)
    saveLastChange()
  }

  function onRemoveVariantForm(index: number) {
    if (variantsFields.length > 1) {
      removeVariantForm(index)

      if (selectedVariantFormIndex === index) {
        const nextVariantFieldIndex = index > 0 ? index - 1 : 0
        setSelectedVariantFormIndex(nextVariantFieldIndex)
      }

      saveLastChange()
    }
  }

  const variantsFields = fields as VariantField[]

  const selectedVariantField = variantsFields[selectedVariantFormIndex]

  function setSelectedVariantFormIndex(index: number) {
    setValue('selectedVariantFormIndex', index)
    saveLastChange()
  }

  return {
    variantsFields,
    setSelectedVariantFormIndex,
    onAppendVariantForm,
    appendVariantForm,
    onRemoveVariantForm,
    moveVariantForm,
    selectedVariantFormIndex,
    selectedVariantField,
  }
}

type VariantsFieldArray = ReturnType<typeof useVariantsFieldArray>

export type { VariantsFieldArray }

export default useVariantsFieldArray
