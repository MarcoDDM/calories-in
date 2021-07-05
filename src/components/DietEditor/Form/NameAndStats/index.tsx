import { Flex, Input, chakra } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useMealsStatsStoreState } from 'core/stats'
import StatsLayout from 'components/stats/StatsLayout'
import Stat from 'components/stats/Stat'
import { Info } from 'react-feather'
import RightAligned from 'components/general/RightAligned'
import Name from './Name'
import EnergyStat from './EnergyStat'
import ResponsiveIconButton from 'components/general/ResponsiveIconButton'
import getMacrosPercentages, {
  roundedMacroPercentages,
} from 'core/stats/getMacrosPercentages'

const IntoStyled = chakra(Info)

type Props = {
  isEditingExistingDiet: boolean
}

function NameAndStats({ isEditingExistingDiet }: Props) {
  const { register } = useFormContext()
  const { mealsStatsSum } = useMealsStatsStoreState()

  const {
    proteinPercentage,
    carbsPercentage,
    fatPercentage,
  } = roundedMacroPercentages(getMacrosPercentages(mealsStatsSum))

  return (
    <Flex
      pb={2}
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      width="100%"
    >
      <Input type="hidden" {...register('formId')} />

      <StatsLayout
        nameElement={<Name />}
        energyElement={
          <EnergyStat
            energy={mealsStatsSum.energy}
            isEditingExistingDiet={isEditingExistingDiet}
          />
        }
        proteinElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Protein"
            value={mealsStatsSum.protein}
            valueDetail={`${proteinPercentage}%`}
            showsValueDetail={true}
          />
        }
        carbsElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Carbs"
            value={mealsStatsSum.carbs}
            valueDetail={`${carbsPercentage}%`}
            showsValueDetail={true}
          />
        }
        fatElement={
          <Stat
            justifyContent="flex-start"
            type="diet"
            label="Fat"
            value={mealsStatsSum.fat}
            valueDetail={`${fatPercentage}%`}
            showsValueDetail={true}
          />
        }
        menuElement={
          <RightAligned>
            <ResponsiveIconButton
              isDisabled={true}
              aria-label="Nutrition details"
              icon={<IntoStyled size={20} pointerEvents="none" />}
              variant="ghost"
            />
          </RightAligned>
        }
      />
    </Flex>
  )
}

export default NameAndStats
