import { useSelectedCharacter } from "../Store/useSelectedCharacter";

export const useSelectedCharacterHook = () => {
    const { isCharacterSelected, setIsCharacterSelected } = useSelectedCharacter();
    return {isCharacterSelected, setIsCharacterSelected};
};