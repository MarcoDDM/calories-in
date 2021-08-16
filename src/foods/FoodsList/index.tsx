import {
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
  Flex,
  Text,
  FlexProps,
  HStack,
  Box,
} from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import { Search } from 'react-feather'
import VirtualizedList from './VirtualizedList'
import { Selection, Item } from 'general/useSelection'
import {
  ForwardedRef,
  RefObject,
  useRef,
  useImperativeHandle,
  forwardRef,
  ChangeEvent,
} from 'react'
import { useFoods } from 'foods'
import {
  useFilterFoods,
  useFoodsFilter,
  useFoodsFilterActions,
} from 'foods-filters'
import { Food } from 'foods'
import { FixedSizeList } from 'react-window'
import { FoodsFilterPopoverOrModal } from 'foods-filters'

const SearchStyled = chakra(Search)

type FoodsListMethods = {
  scrollToFood: (food: Food) => void
}

type Props = {
  searchInputRef?: RefObject<HTMLInputElement>
  selection: Selection<Item>
  onFoodPreview: (food: Food) => void
  forwardedRef?: ForwardedRef<FoodsListMethods>
} & FlexProps

function FoodsList({
  selection,
  searchInputRef,
  onFoodPreview,
  forwardedRef,
  ...rest
}: Props) {
  const { allFoods, userFoods } = useFoods()
  const listRef = useRef<FixedSizeList>(null)

  const filter = useFoodsFilter()
  const foodsFilterActions = useFoodsFilterActions()
  const filteredFoods = useFilterFoods(allFoods, userFoods, filter)

  useImperativeHandle(forwardedRef, () => ({
    scrollToFood: (food: Food) => {
      foodsFilterActions.resetCategoryIdAndQuery()

      if (listRef.current) {
        const foods = filter.onlyFoodsAddedbyUser ? userFoods : allFoods
        const index = foods.map(({ id }) => id).indexOf(food.id)
        listRef.current.scrollToItem(index, 'center')
      }
    },
  }))

  return (
    <Flex flexDirection="column" {...rest}>
      <HStack spacing={3}>
        <Box>
          <FoodsFilterPopoverOrModal />
        </Box>

        <InputGroup size="md" flex={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchStyled pointerEvents="none" color="gray.400" />}
          />
          <Input
            ref={searchInputRef}
            value={filter.query}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              foodsFilterActions.updateFilter({ query: event.target.value })
            }
            placeholder="Search"
          />
        </InputGroup>
      </HStack>

      <Divider mt={3} width="100%" />

      {filteredFoods.length > 0 ? (
        <VirtualizedList
          ref={listRef}
          foodsCount={filteredFoods.length}
          isFoodSelected={food => selection.isIdSelected(food.id)}
          getFood={index => filteredFoods[index]}
          onFoodSelect={food => selection.onToggleItem(food)}
          onFoodPreview={onFoodPreview}
        />
      ) : (
        <Flex
          textColor="gray.400"
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Text>No foods found</Text>
        </Flex>
      )}
    </Flex>
  )
}

export type { FoodsListMethods }

export default forwardRef<any, Props>((props, ref) => (
  <FoodsList {...props} forwardedRef={ref} />
))