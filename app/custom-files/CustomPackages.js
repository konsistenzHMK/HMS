import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { decode, encode } from 'base-64'
import storage from '@react-native-async-storage/async-storage'

const storageConfig = {
  setItem: (key, data) => storage.setItem(key, data),
  getItem: (key) => storage.getItem(key),
  removeItem: (key) => storage.removeItem(key),
}

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2YnRjZGppaWJjYWxlcWpkcmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNzMyMzQsImV4cCI6MTk5NDk0OTIzNH0.EBIKVKhd83o2A5LHa0cgqhg1x6TCncoMA77RFoJAx2s'

const supabase = createClient('https://pvbtcdjiibcaleqjdrih.supabase.co', API_KEY, {
  // localStorage: storageConfig,
  // persistSession: true,
  // autoRefreshToken: true,
  // detectSessionInUrl: false,
  auth: {
    storage: storageConfig,
  },
})

export { supabase, decode, encode }
