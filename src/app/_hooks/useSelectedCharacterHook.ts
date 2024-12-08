import { useSelectedCharacter } from "../Store/useSelectedCharacter";

export const useSelectedCharacterHook = () => {
    const { isCharacterSelected, setCharacterSelected } = useSelectedCharacter();
    return {isCharacterSelected, setCharacterSelected};
};