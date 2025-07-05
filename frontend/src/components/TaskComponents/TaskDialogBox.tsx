import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelectedStoreTask } from '../../context/Store'

export default function () {
  let [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const setSelectedTask = useSelectedStoreTask((state:any)=>(state.setSelectedTask))
  

  

  function close() {
    setIsOpen(false)
  }

  return (
    <>

      <Dialog open={isOpen} as="div" className="relative  z-10 focus:outline-none" onClose={close}>
        <div className="fixed backdrop-blur-2xl inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex  min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md bg-white border rounded-xl  p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                Are you sure Log Out ? 
              </DialogTitle>
              
              <div className="mt-4">
                <Button
                  className="inline-flex items-center cursor-pointer mx-3 gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={()=>{close()
                  
                    navigate('/')

                    setTimeout(() => {
                      setSelectedTask('Dashboard');
                    }, 0);

                    setTimeout(() => {
                    localStorage.setItem('token', '');
                    localStorage.setItem('name', '');
                    localStorage.setItem('email', '');
                    localStorage.setItem('projectId', '');
                  }, 0);

                  
                  }}
                >
                  Yes
                </Button>
                <Button
                  className="inline-flex mx-3 cursor-pointer items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={()=>{close()
                    setSelectedTask('Dashboard')
                    navigate('/admin/projects/task')

                  }}
                >
                  No
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}