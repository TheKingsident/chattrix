import ctypes
import os

def load_library():
    try:
        if not os.path.exists('c_lib/comment_processor.so'):
            raise FileNotFoundError("The shared library 'comment_processor.so' was not found.")
        
        lib = ctypes.CDLL('c_lib/comment_processor.so')

        if not hasattr(lib, 'contains_keyword'):
            raise AttributeError("The function 'contains_keyword' is missing in the library.")

        lib.contains_keyword.argtypes = [ctypes.c_char_p, ctypes.c_char_p]
        lib.contains_keyword.restype = ctypes.c_bool

        return lib
    
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return None
    except AttributeError as e:
        print(f"Error: {e}")
        return None
    except OSError as e:
        print(f"OS error: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None
