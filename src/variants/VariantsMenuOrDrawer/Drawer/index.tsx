import {
  Drawer as DrawerBase,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useDietForm } from 'diets'
import VariantItem from './VariantItem'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSelect: (fieldId: string, index: number) => void
}

function Drawer({ isOpen, onClose, onSelect }: Props) {
  const { variantsForms, selectedVariantFormIndex } = useDietForm()

  return (
    <DrawerBase isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent maxHeight="500px">
        <DrawerCloseButton />
        <DrawerHeader fontSize="md">Variants</DrawerHeader>

        <DrawerBody>
          {variantsForms.map(({ name, fieldId }, index) => {
            const isSelected = index === selectedVariantFormIndex

            return (
              <VariantItem
                key={fieldId}
                name={name}
                isSelected={isSelected}
                onClick={() => {
                  onClose()
                  onSelect(fieldId, index)
                }}
              />
            )
          })}
        </DrawerBody>
      </DrawerContent>
    </DrawerBase>
  )
}

export default Drawer