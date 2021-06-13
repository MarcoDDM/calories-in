import { IngredientField, MealField } from 'core/dietForm'
import { Box, Text } from '@chakra-ui/react'
import IngredientItem from './IngredientItem'
import { Droppable } from 'react-beautiful-dnd'

type Props = {
  mealIndex: number
  mealField: MealField
  ingredientsFields: IngredientField[]
  onIngredientRemove: (index: number, mealIndex: number) => void
}

function IngredientsList({
  mealIndex,
  mealField,
  onIngredientRemove,
  ingredientsFields,
}: Props) {
  return (
    <Droppable droppableId={mealField.fieldId as string} type="ingredientsList">
      {provided => (
        <Box ref={provided.innerRef} minHeight="48px">
          {ingredientsFields.map((ingredientField, index) => (
            <IngredientItem
              key={ingredientField.fieldId}
              onRemove={onIngredientRemove}
              mealIndex={mealIndex}
              index={index}
              ingredientField={ingredientField}
            />
          ))}
          {ingredientsFields.length > 0 && provided.placeholder}
          {ingredientsFields.length === 0 && <Text fontSize="lg">Empty</Text>}
        </Box>
      )}
    </Droppable>
  )
}

export default IngredientsList
