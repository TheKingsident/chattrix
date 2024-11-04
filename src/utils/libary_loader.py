import ctypes

lib = ctypes.CDLL('./comment_processor.so')

lib.process_comments.argtypes = [ctypes.c_char_p, ctypes.c_char_p]
lib.process_comments.restype = ctypes.c_bool