export RSYNC_RSH ="ssh -T -c aes128-ctr -o Compression = no -x"

rsync -av --progress ./prt/scenes/cubemap ./homework2/assets
