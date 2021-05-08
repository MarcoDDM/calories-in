import { Flex, Input, IconButton } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { Diet } from 'core/types'
import { useDietStats } from 'core/stats'
import StatsLayout from 'components/general/StatsLayout'
import { Stat } from 'components/general'
import { Info } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import { useRef } from 'react'
import { useElementHeightUpdate } from 'core/ElementHeightProvider'
import Name from './Name'
import EnergyStat from './EnergyStat'

type Props = {
  onDietChange: (diet: Diet) => void
  onNewDiet: () => void
  isEditingExistingDiet: boolean
}

/*const anotherDiet: Diet = {
    id: 2,
    name: 'Another',
    meals: [
      {
        name: 'Meal A',
        ingredients: [{ amountInGrams: 200, foodId: 2 }],
      },
      { name: 'Meal B', ingredients: [{ amountInGrams: 200, foodId: 2 }] },
    ],
    foodsByIdMap: {
      '2': { id: 2, name: 'food2', categoryId: 1 },
    },
  }*/

function NameAndStats({
  onDietChange,
  onNewDiet,
  isEditingExistingDiet,
}: Props) {
  const { register } = useFormContext()
  const dietStats = useDietStats()
  const statsRef = useRef<HTMLDivElement>(null)

  useElementHeightUpdate(statsRef)

  /*function onChangeButtonClick() { 
      onDietChange(anotherDiet)
    }
  */
  function onNewButtonClick() {
    onNewDiet()
  }

  const amountInGrams = dietStats.amountInGrams

  return (
    <Flex pb={3} borderBottomWidth={1} width="100%">
      <Input type="hidden" {...register('formId')} />

      <StatsLayout
        ref={statsRef}
        nameElement={<Name onSelectDiet={onNewButtonClick} />}
        energyElement={
          <EnergyStat
            dietStats={dietStats}
            isEditingExistingDiet={isEditingExistingDiet}
          />
        }
        proteinElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Protein"
            value={`${amountInGrams * 2}g`}
            valueDetail="154g"
          />
        }
        carbsElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Carbs"
            value={`${amountInGrams * 2.5}g`}
            valueDetail="154g"
          />
        }
        fatElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Fat"
            value={`${amountInGrams * 1.5}g`}
            valueDetail="154g"
          />
        }
        menuElement={
          <RightAligned>
            <IconButton
              aria-label="test"
              icon={<Info color="gray" pointerEvents="none" />}
              variant="ghost"
            />
          </RightAligned>
        }
      />
    </Flex>
  )
}

export default NameAndStats
