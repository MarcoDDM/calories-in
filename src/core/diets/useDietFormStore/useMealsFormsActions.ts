import { useCallback, SetStateAction, useEffect } from 'react'
import { DietForm } from '../dietForm'
import produce from 'immer'
import { getInsertMealFormAnimationKey, getMealForm, MealForm } from '../meals'
import { AnimationsStoreActions } from 'general/oneTimeCheck/useOneTimeCheckStore'
import { DndRespondersActions } from 'general/dndResponders/useDndRespondersStore'
import { DropResult } from 'react-beautiful-dnd'

type Params = {
  setDietForm: (action: SetStateAction<DietForm>) => void
  animationsStoreActions: AnimationsStoreActions
  dndRespondersActions: DndRespondersActions
}

function useMealsFormsActions({
  setDietForm,
  animationsStoreActions,
  dndRespondersActions,
}: Params) {
  const appendMealForm = useCallback(
    (variantIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          const mealForm = getMealForm()

          animationsStoreActions.set(
            getInsertMealFormAnimationKey(mealForm.fieldId)
          )

          draftDietForm.variantsForms[variantIndex].mealsForms.push(mealForm)
        })
      ),
    [setDietForm, animationsStoreActions]
  )

  const removeMealForm = useCallback(
    (variantIndex: number, mealFormIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          draftDietForm.variantsForms[variantIndex].mealsForms.splice(
            mealFormIndex,
            1
          )
        })
      ),
    [setDietForm]
  )

  const setMealFormName = useCallback(
    (variantFormIndex: number, mealFormIndex: number, value: string) =>
      setDietForm(
        produce(draftDietForm => {
          const { variantsForms } = draftDietForm
          const { mealsForms } = variantsForms[variantFormIndex]
          mealsForms[mealFormIndex].name = value
        })
      ),
    [setDietForm]
  )

  const moveMealForm = useCallback(
    (fromIndex: number, toIndex: number) =>
      setDietForm(
        produce(draftDietForm => {
          const { variantsForms, selectedVariantFormIndex } = draftDietForm
          const mealsForms = variantsForms[selectedVariantFormIndex].mealsForms

          const mealForm = mealsForms[fromIndex]
          mealsForms.splice(fromIndex, 1)
          mealsForms.splice(toIndex, 0, mealForm)
        })
      ),
    [setDietForm]
  )

  const updateMealForm = useCallback(
    (
      variantFormIndex: number,
      mealFormIndex: number,
      partialMealForm: Partial<MealForm>
    ) => {
      setDietForm(
        produce(draftDietForm => {
          const { mealsForms } = draftDietForm.variantsForms[variantFormIndex]
          const mealForm = mealsForms[mealFormIndex]
          mealsForms[mealFormIndex] = {
            ...mealForm,
            ...partialMealForm,
          }
        })
      )
    },
    [setDietForm]
  )

  useEffect(() => {
    const responder = (result: DropResult) => {
      const { source, destination, type } = result

      if (destination && type === 'mealsList') {
        moveMealForm(source.index, destination.index)
      }
    }
    dndRespondersActions.pushResponder(responder, 'onDragEnd')

    return () => {
      dndRespondersActions.removeResponder(responder, 'onDragEnd')
    }
  }, [dndRespondersActions, moveMealForm])

  return {
    appendMealForm,
    removeMealForm,
    moveMealForm,
    setMealFormName,
    updateMealForm,
  }
}

type MealsFormsActions = ReturnType<typeof useMealsFormsActions>

export type { MealsFormsActions }

export default useMealsFormsActions
