from pathlib import Path
p = Path(__file__).resolve().parent / "static" / "login-tight.js"
if not p.exists():
    raise SystemExit(0)
t = p.read_text(encoding="utf-8", errors="replace")
old = 'function loggedIn(){\n    try{ if(typeof currentUser==="function" && currentUser()) return true; }catch(e){}\n    try{ if(window.state && state.currentUserId) return true; }catch(e){}\n    var main=$("mainApp"); return !!(main && !main.classList.contains("hidden") && main.style.display!=="none");\n  }'
new = '''function loggedIn(){
    try{ if(localStorage.getItem("ocToken")) return true; }catch(e){}
    try{
      var st=JSON.parse(localStorage.getItem("Own Club")||"{}");
      if(st && st.currentUserId && Array.isArray(st.users)){
        for(var i=0;i<st.users.length;i++){ if(st.users[i] && st.users[i].id===st.currentUserId) return true; }
      }
    }catch(e){}
    return false;
  }'''
if old in t:
    t = t.replace(old, new, 1)
else:
    t = t.replace('var main=$("mainApp"); return !!(main && !main.classList.contains("hidden") && main.style.display!=="none");', 'return false;')
p.write_text(t, encoding="utf-8")
print("login guard patched")
