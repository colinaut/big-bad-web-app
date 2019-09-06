import windows1252 from 'windows-1252';
import utf8 from 'utf8'

export const decodeText = text => {
    return utf8.decode(windows1252.encode(text))
}

export default decodeText