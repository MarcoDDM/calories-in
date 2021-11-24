import { Text, Center, chakra, Button, VStack } from '@chakra-ui/react'
import { Plus } from 'react-feather'

const PlusStyled = chakra(Plus)

type Props = {
  onAddMeal: () => void
}

function EmptyList({ onAddMeal }: Props) {
  return (
    <Center textAlign="center" flex={1} flexDirection="column">
      <VStack spacing={6}>
        <Text fontSize="xl" fontWeight="medium" textColor="gray.500">
          You haven't added any meals to this variant yet
        </Text>
        <Text maxWidth="450px" mt={3} fontSize="md" textColor="gray.400">
          Each variant represents a different type of day in your meal plan. For
          example: a normal day or a cheat day.
        </Text>
        <Button
          mt={3}
          onClick={onAddMeal}
          colorScheme="teal"
          variant="outline"
          size="sm"
          leftIcon={<PlusStyled size={16} pointerEvents="none" />}
        >
          Add meal
        </Button>
      </VStack>
    </Center>
  )
}

export default EmptyList
