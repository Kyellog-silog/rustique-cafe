import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runScript(fileName: string) {
  try {
    console.log(`Running ${fileName}...`)
    const script = readFileSync(join(process.cwd(), 'scripts', fileName), 'utf-8')
    
    // Split script by semicolon and execute each statement
    const statements = script.split(';').filter(stmt => stmt.trim().length > 0)
    
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec', { sql: statement.trim() + ';' })
      if (error) {
        console.error(`Error executing statement:`, error)
        console.log('Statement:', statement.trim())
      }
    }
    
    console.log(`✅ Successfully ran ${fileName}`)
  } catch (err) {
    console.error(`Failed to run ${fileName}:`, err)
  }
}

async function main() {
  console.log('Running database scripts...')
  
  // Run scripts in order
  await runScript('001_create_menu_items.sql')
  await runScript('002_fix_rls_policies.sql')
  
  console.log('Done!')
  process.exit(0)
}

main()

main()
